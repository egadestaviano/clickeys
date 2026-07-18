import React from "react";
import { Link } from "react-router-dom";
import { MaterialIcon } from "@/components/materialIcon";

interface BreadcrumbProps {
  pageTitle: string;
}

const PageBreadcrumb: React.FC<BreadcrumbProps> = ({ pageTitle }) => {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
      <h2 className="text-xl font-semibold text-foreground">
        {pageTitle}
      </h2>

      <nav aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-sm">
          <li>
            <Link
              to="/"
              className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-brand"
            >
              Home
              <MaterialIcon name="chevron_right" className="text-[16px]" />
            </Link>
          </li>

          <li className="font-medium text-foreground">
            {pageTitle}
          </li>
        </ol>
      </nav>
    </div>
  );
};

export default PageBreadcrumb;
