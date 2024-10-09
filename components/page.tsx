"use client";
import { startFlatfile } from "@flatfile/javascript";
export const Page = () => {

    const openFlatfile = async () => {

        const sheet = {
          name: "Contacts",
          slug: "contacts",
          fields: [
            {
              key: "name",
              type: "string",
              label: "Name",
              constraints: [{ type: "required" }],
            },
            {
              key: "email",
              type: "string",
              label: "Email",
              constraints: [{ type: "required" }, { type: "unique" }],
            },
            {
              key: "age",
              type: "number",
              label: "Age",
            },
            {
              key: "employmentStatus",
              type: "boolean",
              label: "Currently employed?",
            },
            {
              key: "birthYear",
              type: "enum",
              label: "Birth Year",
              config: {
                options: [
                  { value: "1999", label: "1999" },
                  { value: "2000", label: "2000" },
                  // more here
                ],
              },
            },
          ],
        };
    
        const flatfileOptions = {
          closeSpace: {
            operation: "submitActionFg",
            onClose: () => console.log("closed"),
          },
          displayAsModal: true,
          namespace: "portal",
          onRecordHook: (record) => {
            const name = record.get("name");
            if (name) {
              record.set("name", name.toUpperCase());
              record.addInfo("name", "We updated the values to all uppercase");
            }
            return record;
          },
          onSubmit: async ({ sheet, ...space }) => {
            const data = await sheet.allData();
            console.log(data, space);
          },
          publishableKey: "pk_bda0c4cf3d6747edbafdf9ba806350cd", // this one can be public as is just for testing
          sheet,
          themeConfig: {
            root: {
              primaryColor: "red",
              textColor: "white",
              logo: "https://images.ctfassets.net/hjneo4qi4goj/gL6Blz3kTPdZXWknuIDVx/7bb7c73d93b111ed542d2ed426b42fd5/flatfile.svg",
            },
          },
        };
        startFlatfile(flatfileOptions);
      }
      return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
          <button onClick={openFlatfile}>
            Open flatfile
          </button>
    
        </div>
      );
    }