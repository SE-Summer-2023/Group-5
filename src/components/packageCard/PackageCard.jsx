import {
  IconBeach,
  IconCalendarTime,
  IconPlaneInflight,
  IconBuilding,
} from "@tabler/icons-react";
import {
  Card,
  Text,
  Group,
  Badge,
  Button,
  createStyles,
  rem,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  section: {
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },

  like: {
    color: theme.colors.red[6],
  },

  label: {
    textTransform: "uppercase",
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },
}));

const PackageCard = ({
  packageName,
  packageDuration,
  flightDetails,
  country,
  stayDetails,
  activities,
  packagePrice,
}) => {
  const { classes, theme } = useStyles();

  const features = activities.map((activity) => (
    <Badge
      color={theme.colorScheme === "dark" ? "dark" : "gray"}
      key={activity}
    >
      {activity}
    </Badge>
  ));
  return (
    <Card
      withBorder
      shadow="md"
      radius="md"
      p="md"
      className={classes.card}
      pt={30}
    >
      <Card.Section className={classes.section} mt="md">
        <Group position="apart">
          <IconBeach />
          <Text fz="lg" fw={500}>
            {packageName}
          </Text>
          <Badge size="sm">{country}</Badge>
        </Group>
        <Group position="left" mt={"xs"}>
          <IconCalendarTime />
          <Text fz="sm">{packageDuration}</Text>
        </Group>
        <Group position="left" mt={"xs"}>
          <IconPlaneInflight />
          <Text fz="sm">{flightDetails}</Text>
        </Group>
        <Group position="left" mt={"xs"}>
          <IconBuilding />
          <Text fz="sm">{stayDetails}</Text>
        </Group>
      </Card.Section>

      <Card.Section className={classes.section}>
        <Text mt="xs" className={classes.label} c="dimmed">
          Activities
        </Text>
        <Group spacing={7} mt={"md"}>
          {features}
        </Group>
      </Card.Section>

      <Group mt="xs">
        <Text fw={"bold"} fz="lg">
          {packagePrice}
        </Text>
        <Button radius="md" style={{ flex: 1 }}>
          Select Package
        </Button>
      </Group>
    </Card>
  );
};

export default PackageCard;
