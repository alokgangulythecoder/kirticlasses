import React from "react";
import AdminSimpleListManager from "../components/AdminSimpleListManager";

export default function AdminManageWorkbookScreen() {
  return (
    <AdminSimpleListManager
      collectionName="workbooks"
      screenTitle="Manage Workbook"
      urlLabel="PDF link (Google Drive/Dropbox share link)"
    />
  );
}
