import { WalletInfoType } from "@/types/wallet";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Heading,
  Stack,
  StackDivider,
  Box,
} from "@chakra-ui/react";

export const BasicInfo = (props: WalletInfoType) => {
  return (
    <>
      <Card>
        <CardHeader>
          <Heading size="md"></Heading>
        </CardHeader>

        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Box>
              <Heading size="xs" textTransform="uppercase">
                {props.address.name}
              </Heading>
              <Text pt="2" fontSize="sm">
                {props.address.val}
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                {props.publicKey.name}
              </Heading>
              <Text pt="2" fontSize="sm">
                {props.publicKey.val}
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                {props.balance.name} (Satoshis)
              </Heading>
              <Text pt="2" fontSize="sm">
                {props.balance.val.total}
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                {props.network.name}
              </Heading>
              <Text pt="2" fontSize="sm">
                {props.network.val}
              </Text>
            </Box>
          </Stack>
        </CardBody>
      </Card>
    </>
  );
};
