import { useEffect, useState } from "react";
import { useListFaqQuery } from "@/hooks/useGetFaqQuery";
import { useUserGroup } from "@/hooks/useUserGroup";
import { SideBarProps } from "@/types/types";
import Button from "./commonComponents/Button";


export default function Sidebar({ onShowForm, onSelectFormId }: SideBarProps) {
  const { data: faqList, isLoading, isError } = useListFaqQuery();
  const { getUserGroup } = useUserGroup();
  const [userGroup, setUserGroup] = useState<string | null>(null);

  // Fetch user group only once on mount
  useEffect(() => {
    getUserGroup().then(setUserGroup);
  }, []);

  return (
    <aside className="w-64 bg-white border-r min-h-screen px-4 py-6">
      {/* Show CreateFAQ only if user is in ADMIN group */}
      {userGroup === "ADMIN" && (
        <div className="mb-6">
          <Button
            onClick={onShowForm}
            variant="secondary"
            className="w-full font-semibold"
          >
            CreateFAQ
          </Button>
        </div>
      )}

      {/* FAQ List */}
      <ul className="flex flex-col space-y-2">
        {isLoading && <li>Loading FAQs...</li>}
        {isError && <li>Error loading FAQs</li>}
        {faqList?.map((faq) => (
          <li
            key={faq.formId}
            onClick={() => onSelectFormId(faq.formId)}
            className="block px-4 py-2 rounded hover:bg-gray-100 cursor-pointer"
          >
            {faq.title}
          </li>
        ))}
      </ul>
    </aside>
  );
}