import {SimplePool} from 'nostr-tools';
import {IUser} from '../utils/types'; // Replace IUser with your user data type definition
import {RELAYS_URL} from '../nostr-tools/nostrRelays';
import {DEFAULT_TAG, USER_TAG} from './nostrTags';
import {generatePublic} from './generateKeys'; // Replace with your actual utility function

const pool = new SimplePool();

export const getUser = (privateKey: string): Promise<IUser> => {
  return new Promise((resolve, reject) => {
    let fetchedUser: IUser | null = null;

    // Derive the public key from the private key
    const publicKey = generatePublic(privateKey);

    // Set the filters to only get events from the user associated with the public key
    // Check if only the authors can I look in tags.
    let userSub = pool.sub(RELAYS_URL, [{authors: [publicKey]}]);

    userSub.on('event', (event: any) => {
      console.log('getUser - Event received:', event);
      const userContent: IUser = JSON.parse(event.content);

      // Check if the event is associated with the given public key
      // Verify after the TAGS in 
      // Verify after the tags in array of tags
      // i Have checked all the events but I havent found any event with tag USER_TAG

      if (event.pubkey === publicKey && event.tag === USER_TAG) {
        userContent.id = event.id;
        fetchedUser = userContent;
        resolve(fetchedUser);
        (userSub as any).end(); // Stop listening for more events
      }
    });

    (userSub as any).on('end', () => {
      if (fetchedUser) {
        console.log('getUser - User found:', fetchedUser);
        resolve(fetchedUser);
      } else {
        console.log('getUser - User not found');
        reject(new Error('User not found'));
      }
    });

    (userSub as any).on('error', (err: any) => {
      console.log('getUser - Error received:', err);
      reject(err);
    });
  });
};
