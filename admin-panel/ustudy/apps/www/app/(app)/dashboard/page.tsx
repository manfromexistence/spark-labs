import { auth, clerkClient } from "@clerk/nextjs/server";
import { UserDetails } from "../components/user-details";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { CodeSwitcher } from "../components/code-switcher";
import { LearnMore } from "../components/learn-more";
import { Footer } from "../components/footer";

import { DASHBOARD_CARDS } from "../consts/cards";

export default async function DashboardPage() {
  // const { userId } = auth().protect();

  // const user = await clerkClient.users.getUser(userId);

  // if (!user) return null;

  return (
    <>
      <main className="max-w-[75rem] w-full mx-auto border bg-[#000000] background my-24 rounded-md p-24">
        <div className="w-full h-auto flex items-center justify-center">
            <UserDetails />
          {/* <div className="pt-[3.5rem]">
            <CodeSwitcher />
          </div> */}
        </div>
      </main>
      {/* <LearnMore cards={DASHBOARD_CARDS} />
      <Footer /> */}
    </>
  );
}
