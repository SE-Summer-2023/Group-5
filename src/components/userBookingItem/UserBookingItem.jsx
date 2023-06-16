import { useDispatch } from "react-redux";
import { deleteUserBooking } from "../../utils/firebase";
import { deleteItemFromUserBookings } from "../../store/slices/packsSlice";
import {
  Table,
  Text,
  ActionIcon,
  ScrollArea,
  HoverCard,
  Avatar,
  Container,
  Group,
  rem,
} from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";

const UserBookingItem = ({ data }) => {
  const dispatch = useDispatch();
  const deleteItemHandler = async (item) => {
    await deleteUserBooking(item.userId, item.packageId);
    dispatch(deleteItemFromUserBookings(item));
  };

  const rows = data.map((item) => {
    const id = `${item.userName}+${item.packageId}`;
    return (
      <tr key={id}>
        <td>
          <Text fz="sm">{item.bookDate}</Text>
        </td>
        <td>
          <Text fz="sm">{item.packageName}</Text>
        </td>
        <td>
          <Text fz="sm">{item.country}</Text>
        </td>
        <td>
          <ActionIcon color="red" onClick={() => deleteItemHandler(item)}>
            <IconTrash size="1rem" stroke={1.5} />
          </ActionIcon>
        </td>
      </tr>
    );
  });

  return (
    <>
      <ScrollArea mt={rem(35)}>
        {data.length > 0 ? (
          <Container>
            <Group>
              <HoverCard shadow="md">
                <HoverCard.Target>
                  <Avatar size="md" color="blue">
                    {data[0].userName
                      .split(" ")
                      .map((item) => item.charAt(0))
                      .join("")
                      .toUpperCase()}
                  </Avatar>
                </HoverCard.Target>
                <HoverCard.Dropdown>{data[0].userName}</HoverCard.Dropdown>
              </HoverCard>
              <Text sx={{ fontSize: rem(18), fontWeight: 500 }}>
                {data[0].userName}
              </Text>
              <Text color="dimmed">{data[0].userEmail}</Text>
            </Group>
            <Table striped verticalSpacing="sm" mt={"xl"}>
              <thead>
                <tr>
                  <th>Booking Date</th>
                  <th>Package Name</th>
                  <th>Country</th>
                  <th />
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </Table>
          </Container>
        ) : (
          ""
        )}
      </ScrollArea>
    </>
  );
};

export default UserBookingItem;
