import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { toast } from "react-toastify";
import {
  TextInput,
  PasswordInput,
  Paper,
  Group,
  Button,
  Container,
  Anchor,
  Stack,
  Title,
  NativeSelect,
} from "@mantine/core";
import {
  createUserDocumentFromAuth,
  createAuthUserWithEmailAndPassword,
  signInUserWithEmailandPassword,
} from "../../utils/firebase";

const Auth = (props) => {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [type, toggle] = useToggle(["login", "register"]);
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      isAgent: {},
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length < 6 ? "Password should include at least 6 characters" : null,
      isAgent: (val) =>
        val.userType === "Agent"
          ? val.pwd === "t#t#Px*8hfgQPX["
            ? null
            : "Error"
          : null,
    },
  });

  const handleAuth = async ({ email, password, name, isAgent }) => {
    if (type === "register") {
      try {
        const { user } = await createAuthUserWithEmailAndPassword(
          email,
          password
        );
        const userType = isAgent.userType === undefined ? "User" : "Agent";
        await createUserDocumentFromAuth(user, { name, userType });
        toast.success("User Registered!");
        navigate("/");
      } catch (error) {
        toast.error(`${error.code} \n ${error.message}`);
      }
    } else if (type === "login") {
      try {
        await signInUserWithEmailandPassword(email, password);
        toast.success("Login Successful!");
        navigate("/");
      } catch (error) {
        toast.error(`${error.code} \n ${error.message}`);
      }
    }
  };

  return (
    <Container size={450} my={40}>
      <Paper radius="md" p="xl" withBorder {...props}>
        <Title
          align="center"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 800,
          })}
        >
          Welcome to Concordia Travel
        </Title>
        <Title order={3} mt={20} fw={650} align="center">
          {type.toUpperCase()}
        </Title>

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
              <>
                <NativeSelect
                  required
                  withAsterisk
                  label="Select user type"
                  description="If agent, enter secret key as password"
                  value={value}
                  onChange={(event) => {
                    setValue(event.currentTarget.value);
                    form.setFieldValue("isAgent", {
                      userType: event.currentTarget.value,
                      pwd: form.values.password,
                    });
                  }}
                  data={["User", "Agent"]}
                  error={form.errors.isAgent && "Secret key doesn't match"}
                />
              </>
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
