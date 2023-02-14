import { Box, Flex, Link as ChakraLink } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Link, { LinkProps } from "next/link";
import React, { PropsWithChildren, useState, useEffect } from "react";

const Container = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useRouter();
  return (
    <Flex direction="column">
      <Flex direction="row" justify="space-between" p={2}>
        <Link href="/">dtg.win</Link>
        <Flex gap={4}>
          <Link passHref href={"/schedule"}>
            <ChakraLink>Schedule</ChakraLink>
          </Link>
          <Link passHref href={"/streams"}>
            <ChakraLink>Streams</ChakraLink>
          </Link>
        </Flex>
      </Flex>
      {children}
    </Flex>
  );
};

export default Container;
