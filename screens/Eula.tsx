import React from "react";
import { View, Text, Button, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";

export function Eula({ route }: any) {
  const navigation = useNavigation<any>();

  const handleAccept = () => {
    const { screen } = route.params;
    navigation.navigate(screen);
  };

  const eulaTitle = "EULA";
  const eulaText = `End User License Agreement
    
1) Introduction

This End User License Agreement ("EULA") is a legal agreement between you and White Room for the use of our mobile application White Room. By installing, accessing, or using our application, you agree to be bound by the terms and conditions of this EULA.
    
2) Prohibited Content and Conduct You agree not to use our application to create, upload, post, send, or store any content that:

* Is illegal, infringing, or fraudulent

* Is defamatory, libelous, or threatening

* Is pornographic, obscene, or offensive 

* Is discriminatory or promotes hate speech

* Is harmful to minors

* Is intended to harass or bully others

* Infringes on the intellectual property rights of others

* Violates the privacy or publicity rights of others

* Violates any applicable law or regulation

* Violates any third party's terms of service or privacy policy

* Is in violation of any applicable code of conduct

* Is in violation of any applicable code of ethics

3) You agree not to use our application to:

* Engage in any activity that interferes with or disrupts our application

* Engage in any activity that violates the security of our application

* Attempt to gain unauthorized access to our application or its related systems or networks

* Attempt to gain unauthorized access to any accounts or data not belonging to you

* Attempt to interfere with the proper working of our application

* Attempt to circumvent any content filtering techniques we employ, or attempt to access any feature or area of our application that you are not authorized to access

* Attempt to use our application to send unsolicited communications, promotions, or advertisements

* Attempt to use our application to collect or harvest any personally identifiable information, including account names

* Attempt to use our application to collect or harvest any data about other users

* Attempt to use our application to transmit any computer viruses, worms, defects, Trojan horses, or other items of a destructive nature

* Attempt to use our application to transmit any chain letters, junk email, spam, or any other form of duplicative or unsolicited messages

* Attempt to use our application to transmit any content that you do not have a right to transmit under any law or under contractual or fiduciary relationships (such as inside information, proprietary and confidential information learned or disclosed as part of employment relationships or under nondisclosure agreements)

* Attempt to use our application to transmit any content that infringes any patent, trademark, trade secret, copyright, or other proprietary rights of any party

* Attempt to use our application to transmit any content that you know is false, misleading, untruthful, or inaccurate

* Attempt to use our application to transmit any content that you know is defamatory, libelous, threatening, harassing, abusive, hateful, or embarrassing to any other person or entity as determined by us in our sole discretion

* Attempt to use our application to transmit any content that you know is illegal or promotes illegal activities or conduct that is abusive, threatening, obscene, defamatory, or libelous

* Attempt to use our application to transmit any content that you know may create liability for us or cause us to lose (in whole or in part) the services of our ISPs or other suppliers

* Attempt to use our application to transmit any content that you know may be harmful to minors

* Attempt to use our application to transmit any content that you know may violate any law or regulation

* Attempt to use our application to transmit any content that you know may violate the privacy or publicity rights of any third party

* Attempt to use our application to transmit any content that you know may violate any third party's terms of service or privacy policy or any applicable code of conduct or code of ethics

* Attempt to use our application to transmit any content that you know may be unsolicited or unauthorized advertising, promotional materials, "junk mail," "spam," "chain letters," "pyramid schemes," or any other form of solicitation

* Attempt to use our application to transmit any content that you know may contain software viruses or any other computer code, files, or programs designed to interrupt, destroy, or limit the functionality of any computer software or hardware or telecommunications equipment

* Attempt to use our application to transmit any content that you know may create liability for us or cause us to lose (in whole or in part) the services of our ISPs or other suppliers

## Changes to EULA We reserve the right to update or modify this EULA at any time and without prior notice. Your continued use of our application following any changes to this EULA will be deemed to be your acceptance of such changes.

## Contact Information If you have any questions about this EULA, please contact us at contact@whiteroom.app

## Acceptance of Terms By using our Application, you signify your acceptance of this EULA. If you do not agree to this EULA, you may not use our Application.`;

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.text}> {eulaTitle} </Text>
        <Text style={styles.text}> {eulaText} </Text>
        <Button title="Accept" onPress={handleAccept}></Button>
        <Button
          title="Reject"
          onPress={() => navigation.navigate("Welcome")}
        ></Button>
      </ScrollView>
    </View>
  );
}

export default Eula;
