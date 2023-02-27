import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DevCorporation = () => {
  return (
    <>
      <div className="container-fluid  background-texture">
        <div className="flex items-center my-5 px-4">
          <img
            src="https://i.imgur.com/1k8By32.png"
            className="w-24 h-24 object-cover rounded-xl shadow-xl"
            alt=""
          />
          <div className="ml-4">
            <h2 className="text-3xl font-bold">Dev Corporation</h2>
            <p className="font-medium">@devcorporation</p>
          </div>
        </div>
        <div className="px-4">
          <Tabs defaultValue="account" className="w-full">
            <TabsList>
              <TabsTrigger value="account">Projects</TabsTrigger>
              <TabsTrigger value="password">Stats</TabsTrigger>
              <TabsTrigger value="teste">Teste</TabsTrigger>
            </TabsList>
            <TabsContent value="account" className="border-0 bg-transparent">
              <p className="text-2xl font-medium text-dark-500 dark:text-light-500 mb-4">
                Make changes to your account here. Click save when you&apos;re
                done.
              </p>
            </TabsContent>
            <TabsContent value="password" className="border-0 bg-transparent">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold">Create board</h1>
              </div>
            </TabsContent>
            <TabsContent
              value="teste"
              className="border-0 bg-transparent"
            ></TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default DevCorporation;
