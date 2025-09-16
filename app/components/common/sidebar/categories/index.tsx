"use client";

import { useGetCategoriesQuery } from "@/services/categoryService";
import Link from "next/link";
import { Box } from "@mui/material";
import SidebarWrapper from "../SidebarWrapper";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

const CategoriesSidebar = () => {
  const { data: categories } = useGetCategoriesQuery(null);
  return (
    <SidebarWrapper triggerContent={<MenuRoundedIcon />}>
      <div className="relative flex z-20 flex-col h-[70%] w-full pl-20 justify-center gap-8">
        {categories?.map((cat, i) => (
          <Box
            key={cat.id}
            className="flex relative items-center z-20 gap-4 cursor-pointer"
          >
            <span className="text-xs font-semibold">{i + 1}.</span>

            <p className="text-4xl">
              {" "}
              <Link
                href={`/events/category/${cat.id}`}
                className="text-white/90 hover:text-white text-4xl"
              >
                {cat.name}
              </Link>
            </p>
          </Box>
        ))}
      </div>
    </SidebarWrapper>
  );
};

export default CategoriesSidebar;
