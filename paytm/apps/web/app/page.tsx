import React from 'react';
import { MyText } from '@repo/ui/mytext';
import { PrismaClient } from '@repo/db/client';

import { TUser } from '@repo/ts-types/user';
const Page = () => {
  const user: TUser = { name: 'Abdussamd' };
  return (
    <>
      <h1>{user.name}</h1>
      <MyText />
    </>
  );
};

export default Page;
