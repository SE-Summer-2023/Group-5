import {
  createStyles,
  Badge,
  Group,
  Title,
  Text,
  Card,
  SimpleGrid,
  Container,
  rem,
} from "@mantine/core";
import {
  IconArrowGuide,
  IconMapPins,
  IconStack2,
  IconHeart,
  IconCreditCard,
  IconHeadset,
} from "@tabler/icons-react";

const MOCKDATA = [
  {
    icon: IconMapPins,
    title: "Explore Exciting Destinations",
    description:
      "Discover captivating destinations for unforgettable journeys and lasting memories.",
  },
  {
    icon: IconStack2,
    title: "Customizable Tour Packages",
    description:
      "Tailor your travel experience to your preferences with flexible options.",
  },
  {
    icon: IconHeart,
    title: "Hassle-Free Travel Planning",
    description:
      "Let us handle logistics, transportation, and itinerary management.",
  },
  {
    icon: IconArrowGuide,
    title: "Expert Tour Guides",
    description:
      "Knowledgeable guides ensure a seamless travel experience and local insights.",
  },
  {
    icon: IconCreditCard,
    title: "Easy Booking and Payment Options",
    description:
      "User-friendly website with secure booking and payment methods.",
  },
  {
    icon: IconHeadset,
    title: "24/7 Customer Support",
    description:
      "Dedicated support team available to assist with queries and requests.",
  },
];

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: rem(34),
    fontWeight: 900,

    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(24),
    },
  },

  description: {
    maxWidth: 600,
    margin: "auto",

    "&::after": {
      content: '""',
      display: "block",
      backgroundColor: theme.fn.primaryColor(),
      width: rem(45),
      height: rem(2),
      marginTop: theme.spacing.sm,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },

  card: {
    border: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  cardTitle: {
    "&::after": {
      content: '""',
      display: "block",
      backgroundColor: theme.fn.primaryColor(),
      width: rem(45),
      height: rem(2),
      marginTop: theme.spacing.sm,
    },
  },
}));

const FeaturesCards = () => {
  const { classes, theme } = useStyles();
  const features = MOCKDATA.map((feature) => (
    <Card
      key={feature.title}
      shadow="md"
      radius="md"
      className={classes.card}
      padding="xl"
    >
      <feature.icon size={rem(50)} stroke={2} color={theme.fn.primaryColor()} />
      <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
        {feature.title}
      </Text>
      <Text fz="sm" c="dimmed" mt="sm">
        {feature.description}
      </Text>
    </Card>
  ));

  return (
    <Container size="lg" py="xl" mt={rem(42)}>
      <Group position="center">
        <Badge variant="filled" size="lg">
          The best travel company
        </Badge>
      </Group>

      <Title order={2} className={classes.title} ta="center" mt="sm">
        Journey Beyond Boundaries
      </Title>

      <Text c="dimmed" className={classes.description} ta="center" mt="md">
        Explore extraordinary destinations that push the boundaries of adventure
        and discovery. Unleash your wanderlust and embark on a voyage of a
        lifetime with us.
      </Text>

      <SimpleGrid
        cols={3}
        spacing="xl"
        mt={50}
        breakpoints={[{ maxWidth: "md", cols: 1 }]}
      >
        {features}
      </SimpleGrid>
    </Container>
  );
};

export default FeaturesCards;
