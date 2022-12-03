import { Avatar, MenuButton } from "@chakra-ui/react";
import { useAuth } from "@descope/react-sdk";
import { getDisplayName } from "../../utils/user";

export default function ProfileButton() {
	const { user } = useAuth();
	return (
		<MenuButton p="0px">
			<Avatar
				_hover={{ cursor: "pointer" }}
				color="white"
				name={getDisplayName(user)}
				bg="#11047A"
				size="sm"
				w="40px"
				h="40px"
			/>
		</MenuButton>
	);
}
