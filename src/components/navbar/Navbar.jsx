import { useSelector } from "react-redux";
import { signOutUser } from "../../utils/firebase";
import CartIcon from "../cartIcon/CartIcon";
import {
  createStyles,
  Header,
  Group,
  Button,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  Image,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  link: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan("sm")]: {
      height: rem(42),
      display: "flex",
      alignItems: "center",
      width: "100%",
    },

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    }),
  },

  subLink: {
    width: "100%",
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
    }),

    "&:active": theme.activeStyles,
  },

  dropdownFooter: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    margin: `calc(${theme.spacing.md} * -1)`,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
    paddingBottom: theme.spacing.xl,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
}));

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const { classes, theme } = useStyles();

  return (
    <Box>
      <Header height={60} px="md">
        <Group position="apart" sx={{ height: "100%" }}>
          <Link to={"/"}>
            <Image src={"./imgs/logo.png"} width={"200px"} />
          </Link>

          <Group
            sx={{ height: "100%" }}
            spacing={0}
            className={classes.hiddenMobile}
          >
            <a href="/" className={classes.link}>
              <Link to={"/"}>Home</Link>
            </a>
            <a href="/packages" className={classes.link}>
              <Link to={"/packages"}>Packages</Link>
            </a>
            {user !== null && user.userType === "Agent" ? (
              <>
                <a href="/all-bookings" className={classes.link}>
                  <Link to={"/all-bookings"}>Client Bookings</Link>
                </a>
                <a href="/create-package" className={classes.link}>
                  <Link to={"/create-package"}>Create Package</Link>
                </a>
                <a href="/modify-package" className={classes.link}>
                  <Link to={"/modify-package"}>Modify Package</Link>
                </a>
              </>
            ) : (
              <>
                <a href="/custom-package" className={classes.link}>
                  <Link to={"/custom-package"}>Create Custom Package</Link>
                </a>
                {user && (
                  <a href="/my-bookings" className={classes.link}>
                    <Link to={"/my-bookings"}>My Bookings</Link>
                  </a>
                )}
              </>
            )}
          </Group>

          {user ? (
            <Group className={classes.hiddenMobile}>
              <Link to={"/"}>
                <Button color="red" onClick={signOutUser}>
                  Sign out
                </Button>
              </Link>
              {user !== null && user.userType !== "Agent" ? (
                <CartIcon />
              ) : (
                <></>
              )}
            </Group>
          ) : (
            <Group className={classes.hiddenMobile}>
              <Link to={"/auth"}>
                <Button>Login</Button>
              </Link>
              <CartIcon />
            </Group>
          )}

          <Group className={classes.hiddenDesktop}>
            {user !== null && user.userType !== "Agent" ? <CartIcon /> : <></>}

            <Burger opened={drawerOpened} onClick={toggleDrawer} />
          </Group>
        </Group>
      </Header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />

          <a href="/" className={classes.link}>
            <Link to={"/"}>Home</Link>
          </a>
          <a href="/packages" className={classes.link}>
            <Link to={"/packages"}>Packages</Link>
          </a>
          {user !== null && user.userType === "Agent" ? (
            <>
              <a href="/all-bookings" className={classes.link}>
                <Link to={"/all-bookings"}>Client Bookings</Link>
              </a>
              <a href="/create-package" className={classes.link}>
                <Link to={"/create-package"}>Create Package</Link>
              </a>
              <a href="/modify-package" className={classes.link}>
                <Link to={"/modify-package"}>Modify Package</Link>
              </a>
            </>
          ) : (
            <>
              <a href="/custom-package" className={classes.link}>
                <Link to={"/custom-package"}>Create Custom Package</Link>
              </a>
              {user && (
                <a href="/my-bookings" className={classes.link}>
                  <Link to={"/my-bookings"}>My Bookings</Link>
                </a>
              )}
            </>
          )}

          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />

          {user ? (
            <Group position="center" grow pb="xl" px="md">
              <Link to={"/"}>
                <Button color="red" onClick={signOutUser}>
                  Sign out
                </Button>
              </Link>
            </Group>
          ) : (
            <Group position="center" grow pb="xl" px="md">
              <Link to={"/auth"}>
                <Button>Login</Button>
              </Link>
            </Group>
          )}
        </ScrollArea>
      </Drawer>
    </Box>
  );
};

export default Navbar;
