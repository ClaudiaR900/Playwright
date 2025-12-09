import { test as base } from "@playwright/test";

type Fixture = {
  whatYouSay: string;
};

const fixture = base.extend<Fixture>({

  whatYouSay: async ({}, use: any) => {
    console.log("What do you say?");
    await use();
    console.log("Finished saying.");
  }
});

export default fixture;
