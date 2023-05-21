import { useNavigate } from "react-router-dom";
import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Container,
  Checkbox,
  Anchor,
  Stack,
} from "@mantine/core";
import {
  createUserDocumentFromAuth,
  createAuthUserWithEmailAndPassword,
  signInUserWithEmailandPassword,
} from "../../utils/firebase";

const Auth = (props) => {
  const navigate = useNavigate();
  const [type, toggle] = useToggle(["login", "register"]);
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  const handleAuth = async ({ email, password, name }) => {
    if (type === "register") {
      try {
        const { user } = await createAuthUserWithEmailAndPassword(
          email,
          password
        );
        await createUserDocumentFromAuth(user, { name });
      } catch (error) {
        console.log(error.code, error.message);
      }
    } else if (type === "login") {
      try {
        await signInUserWithEmailandPassword(email, password);
        navigate("/");
      } catch (error) {
        console.log(error.code, error.message);
      }
    }
  };

  return (
    <Container size={450} my={40}>
      <Paper radius="md" p="xl" withBorder {...props}>
        <Text size="xl" weight={500} align="center">
          Welcome to Concordia Travel
        </Text>
        <Text mt={20} size="lg" weight={600} align="center">
          {type.toUpperCase()}
        </Text>

        <form
          onSubmit={form.onSubmit((values) => {
            handleAuth(values);
          })}
        >
          <Stack mt={10}>
            {type === "register" && (
              <TextInput
                label="Name"
                placeholder="Your name"
                value={form.values.name}
                onChange={(event) =>
                  form.setFieldValue("name", event.currentTarget.value)
                }
                radius="md"
              />
            )}

            <TextInput
              required
              label="Email"
              placeholder="hello@mantine.dev"
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue("email", event.currentTarget.value)
              }
              error={form.errors.email && "Invalid email"}
              radius="md"
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) =>
                form.setFieldValue("password", event.currentTarget.value)
              }
              error={
                form.errors.password &&
                "Password should include at least 6 characters"
              }
              radius="md"
            />

            {type === "register" && (
              <Checkbox
                label="I accept terms and conditions"
                checked={form.values.terms}
                onChange={(event) =>
                  form.setFieldValue("terms", event.currentTarget.checked)
                }
              />
            )}
          </Stack>

          <Group position="apart" mt="xl">
            <Anchor
              component="button"
              type="button"
              color="dimmed"
              onClick={() => toggle()}
              size="xs"
            >
              {type === "register"
                ? "Already have an account? Login"
                : "Don't have an account? Register"}
            </Anchor>
            <Button type="submit" radius="xl">
              {upperFirst(type)}
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
