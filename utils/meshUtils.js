export const handleOpenMeshModal = async (setCatalogLink, setOpenMeshModal) => {
  try {
    const link = await fetch('/api/transfers/linkToken');

    const response = await link.json();
    if (response) {
      setCatalogLink(response.content.linkToken);
      setOpenMeshModal(true);
    }
  } catch (error) {
    console.log('Error from Mesh:', error);
    return `Something went wrong: ${error.message}`;
  }
};

export const handleExit = (error) => {
  console.log('Broker connection closed:', error);
};

export const handleMeshSuccess = (newAuthData) => {
  console.log('success', newAuthData);
  localStorage.setItem('authData', JSON.stringify(newAuthData));
};

export const handleTransferFinished = (handleTransferFinished) => {
  console.log(handleTransferFinished);
};
