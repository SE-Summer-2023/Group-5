import { useNavigate } from "react-router-dom";

import { useForm } from "@mantine/form";
import {
  TextInput,
  Text,
  Paper,
  Group,
  Button,
  Container,
  Stack,
} from "@mantine/core";

const CustomPackageForm = ({ type }) => {
  const navigate = useNavigate();

  const handlePackageForm = (packDetails) => {};

  const form = useForm({
    initialValues: {
      packageId: "",
      packageName: "",
      packageDuration: "",
      flightDetails: "",
      country: "",
      stayDetails: "",
      activities: [],
      packagePrice: "",
    },
    validate: {},
  });

  return (
    <Container size={450} my={40}>
      <Paper radius="md" p="xl" withBorder>
        <Text size="xl" weight={500} align="center">
          {type} package
        </Text>
        {type == "Create" ? (
          <Text mt={20} size="lg" weight={600} align="center">
            Create a new package
          </Text>
        ) : (
          <Text mt={20} size="lg" weight={600} align="center">
            Modify an existing package
          </Text>
        )}
        <form
          onSubmit={form.onSubmit((values) => {
            const activityArr = values.activities
              .split(",")
              .map((item) => item.trim());
            const newValues = { ...values, activities: activityArr };
            handlePackageForm(newValues);
          })}
        >
          <Stack mt={10}>
            <TextInput
              label="Package Id"
              placeholder="Enter the package id"
              value={form.values.packageId}
              onChange={(event) =>
                form.setFieldValue("packageId", event.currentTarget.value)
              }
              radius="md"
              error={form.errors.packageId && "Package id must be different"}
              required
            />
            <TextInput
              label="Package Name"
              placeholder="Enter the package name"
              value={form.values.packageName}
              onChange={(event) =>
                form.setFieldValue("packageName", event.currentTarget.value)
              }
              radius="md"
              required
            />
            <TextInput
              label="Package Duration"
              placeholder="Enter the package duration"
              value={form.values.packageDuration}
              onChange={(event) =>
                form.setFieldValue("packageDuration", event.currentTarget.value)
              }
              radius="md"
              required
            />
            <TextInput
              label="Flight Details"
              placeholder="Enter the flight details"
              value={form.values.flightDetails}
              onChange={(event) =>
                form.setFieldValue("flightDetails", event.currentTarget.value)
              }
              radius="md"
              required
            />
            <TextInput
              label="Country"
              placeholder="Enter the country name"
              value={form.values.country}
              onChange={(event) =>
                form.setFieldValue("country", event.currentTarget.value)
              }
              radius="md"
              required
            />
            <TextInput
              label="Stay Details"
              placeholder="Enter the stay details"
              value={form.values.stayDetails}
              onChange={(event) =>
                form.setFieldValue("stayDetails", event.currentTarget.value)
              }
              radius="md"
              required
            />
            <TextInput
              label="Activities"
              placeholder="Enter the activities"
              value={form.values.activities}
              onChange={(event) =>
                form.setFieldValue("activities", event.currentTarget.value)
              }
              radius="md"
              required
            />
            <TextInput
              label="Price"
              placeholder="Enter the package price"
              value={form.values.packagePrice}
              onChange={(event) =>
                form.setFieldValue("packagePrice", event.currentTarget.value)
              }
              radius="md"
              required
            />
          </Stack>

          <Group position="apart" mt="xl">
            <Button type="submit" radius="xl">
              {"Submit"}
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
};

export default CustomPackageForm;
