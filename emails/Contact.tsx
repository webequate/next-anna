import { MjmlSection, MjmlColumn, MjmlImage } from "mjml-react";
import { Template } from "mailing-core";
import Layout from "./components/Layout";
import Button from "./components/Button";
import Heading from "./components/Heading";
import Text from "./components/Text";
import { fontSize, colors } from "./theme";
import assetUrl from "./util/assetUrl";

type ContactProps = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const Contact: Template<ContactProps> = ({ name, email, subject, message }) => {
  return (
    <Layout>
      <MjmlSection
        backgroundColor={colors.white}
        cssClass="gutter"
        paddingBottom={64}
      >
        <MjmlColumn>
          <MjmlImage
            height={96}
            width={148.45}
            src={assetUrl("/assets/cards.png")}
            paddingBottom={32}
          />
          <Heading
            fontSize={fontSize.xxl}
            lg={{ fontSize: fontSize.xl }}
            align="center"
            maxWidth={450}
            paddingBottom={32}
          >
            You received an inquiry from your portfolio contact form!
          </Heading>
          <Text align="left" paddingBottom={32}>
            <strong>Name:</strong> {name}
            <br />
            <strong>Email:</strong> {email}
            <br />
            <strong>Subject:</strong> {subject}
            <br />
            <strong>Message:</strong> {message}
          </Text>
        </MjmlColumn>
      </MjmlSection>
    </Layout>
  );
};

export default Contact;
