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
  Menu,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link } from "react-router-dom";
import {
  IconChevronDown,
  IconPlus,
  IconPencil,
  IconCards,
} from "@tabler/icons-react";

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
            <Link to={"/"} className={classes.link}>
              Home
            </Link>

            {user !== null && user.userType === "Agent" ? (
              <Menu
                trigger="hover"
                openDelay={100}
                closeDelay={200}
                closeOnItemClick
              >
                <Menu.Target>
                  <Group className={classes.link}>
                    Packages
                    <IconChevronDown size={14} />
                  </Group>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item icon={<IconCards size={14} />}>
                    <Link to={"/packages"} className={classes.link}>
                      All Packages
                    </Link>
                  </Menu.Item>
                  <Menu.Item icon={<IconPlus size={14} />}>
                    <Link to={"/create-package"} className={classes.link}>
                      Create Package
                    </Link>
                  </Menu.Item>
                  <Menu.Item icon={<IconPencil size={14} />}>
                    <Link to={"/modify-package"} className={classes.link}>
                      Modify Package
                    </Link>
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            ) : (
              <Link to={"/packages"} className={classes.link}>
                All Packages
              </Link>
            )}
            {user !== null && user.userType === "Agent" ? (
              <>
                <Link to={"/all-bookings"} className={classes.link}>
                  Client Bookings
                </Link>
                <Link to={"/revenue-reports"} className={classes.link}>
                  Revenue Reports
                </Link>
              </>
            ) : (
              <>
                <Link to={"/custom-package"} className={classes.link}>
                  Create Custom Package
                </Link>

                {user && (
                  <Link to={"/my-bookings"} className={classes.link}>
                    My Bookings
                  </Link>
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

          <Link to={"/"} className={classes.link} onClick={closeDrawer}>
            Home
          </Link>

          <Link to={"/packages"} className={classes.link} onClick={closeDrawer}>
            Packages
          </Link>
          {user !== null && user.userType === "Agent" ? (
            <>
              <Link
                to={"/all-bookings"}
                className={classes.link}
                onClick={closeDrawer}
              >
                Client Bookings
              </Link>

              <Link
                to={"/create-package"}
                className={classes.link}
                onClick={closeDrawer}
              >
                Create Package
              </Link>

              <Link
                to={"/modify-package"}
                className={classes.link}
                onClick={closeDrawer}
              >
                Modify Package
              </Link>

              <Link
                to={"/revenue-reports"}
                className={classes.link}
                onClick={closeDrawer}
              >
                Revenue Reports
              </Link>
            </>
          ) : (
            <>
              <Link
                to={"/custom-package"}
                className={classes.link}
                onClick={closeDrawer}
              >
                Create Custom Package
              </Link>

              {user && (
                <Link
                  to={"/my-bookings"}
                  className={classes.link}
                  onClick={closeDrawer}
                >
                  My Bookings
                </Link>
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
