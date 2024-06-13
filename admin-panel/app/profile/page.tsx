import { UserDetails } from "../components/user-details";


export default async function DashboardPage() {
  // const { userId } = auth().protect();

  // const user = await clerkClient.users.getUser(userId);

  // if (!user) return null;

  return (
    <>
      <main className="max-w-[75rem] w-full mx-auto border bg-theme my-24 rounded-md p-24">
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
