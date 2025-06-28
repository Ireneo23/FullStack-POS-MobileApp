import React from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import HeaderComponent from "../components/HeaderComponent";

const Terms = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { type } = route.params || {};

  const getTitle = () => {
    return type === "privacy" ? "Privacy Policy" : "Terms and Conditions";
  };

  const getContent = () => {
    if (type === "privacy") {
      return {
        title: "Privacy Policy",
        content: [
          "Last updated: December 2024",
          "",
          "1. Information We Collect",
          "We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support.",
          "",
          "2. How We Use Your Information",
          "We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you.",
          "",
          "3. Information Sharing",
          "We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.",
          "",
          "4. Data Security",
          "We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.",
          "",
          "5. Your Rights",
          "You have the right to access, update, or delete your personal information. You may also opt out of certain communications.",
          "",
          "6. Contact Us",
          "If you have any questions about this Privacy Policy, please contact us at privacy@starpos.com.",
        ],
      };
    } else {
      return {
        title: "Terms and Conditions",
        content: [
          "Last updated: December 2024",
          "",
          "1. Acceptance of Terms",
          "By accessing and using StarPOS, you accept and agree to be bound by the terms and provision of this agreement.",
          "",
          "2. Use License",
          "Permission is granted to temporarily download one copy of StarPOS for personal, non-commercial transitory viewing only.",
          "",
          "3. Disclaimer",
          "The materials on StarPOS are provided on an 'as is' basis. StarPOS makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.",
          "",
          "4. Limitations",
          "In no event shall StarPOS or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on StarPOS, even if StarPOS or a StarPOS authorized representative has been notified orally or in writing of the possibility of such damage.",
          "",
          "5. Accuracy of Materials",
          "The materials appearing on StarPOS could include technical, typographical, or photographic errors. StarPOS does not warrant that any of the materials on its website are accurate, complete or current.",
          "",
          "6. Links",
          "StarPOS has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by StarPOS of the site.",
          "",
          "7. Modifications",
          "StarPOS may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these Terms and Conditions of Use.",
          "",
          "8. Contact Information",
          "If you have any questions about these Terms and Conditions, please contact us at terms@starpos.com.",
        ],
      };
    }
  };

  const content = getContent();

  return (
    <SafeAreaView style={styles.container}>
      <HeaderComponent title={getTitle()} onBack={() => navigation.goBack()} />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <Text style={styles.title}>{content.title}</Text>
          {content.content.map((paragraph, index) => (
            <Text key={index} style={styles.paragraph}>
              {paragraph}
            </Text>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    marginBottom: 48,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    backgroundColor: "#fff",
    margin: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0D3A2D",
    marginBottom: 20,
    textAlign: "center",
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
    marginBottom: 12,
  },
});

export default Terms;
