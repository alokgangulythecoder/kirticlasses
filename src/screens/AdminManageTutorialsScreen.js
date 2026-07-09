import React from "react";
import AdminSimpleListManager from "../components/AdminSimpleListManager";

export default function AdminManageTutorialsScreen() {
  return (
    <AdminSimpleListManager
      collectionName="tutorials"
      screenTitle="Manage Tutorials"
      urlLabel="YouTube video link"
    />
  );
}
