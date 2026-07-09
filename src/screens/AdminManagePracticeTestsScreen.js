import React from "react";
import AdminSimpleListManager from "../components/AdminSimpleListManager";

export default function AdminManagePracticeTestsScreen() {
  return (
    <AdminSimpleListManager
      collectionName="practiceTests"
      screenTitle="Manage Practice Tests"
      urlLabel="PDF link (Google Drive/Dropbox share link)"
    />
  );
}
