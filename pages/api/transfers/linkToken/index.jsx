import { FrontApi } from '@front-finance/api';
export default async function handler(req, res) {
  const { PROD_API_KEY, MESH_API_URL, CLIENT_ID } = process.env;

  //0x3706995bbe1810fc30beec089132e5b38dd675a7
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const bodyObject = {
    UserId: 'coin10244',
    transferOptions: {
      toAddresses: [
        {
          symbol: 'ETH',
          address: '0x3706995bbe1810fc30beec089132e5b38dd675a7', //portal Addres
          networkId: 'e3c7fdd8-b1fc-4e51-85ae-bb276e075611', // eth network id
        },
      ],
    },
  };

  const api = new FrontApi({
    baseURL: MESH_API_URL,
    headers: {
      'Content-Type': 'application/json',
      'X-Client-Id': CLIENT_ID,
      'X-Client-Secret': PROD_API_KEY,
    },
  });

  try {
    const getCatalogLink =
      await api.managedAccountAuthentication.v1LinktokenCreate(bodyObject);

    if (getCatalogLink.status !== 200) {
      const errorMessage = `Failed to retrieve or generate catalogLink. Status: ${getCatalogLink.status} - ${getCatalogLink.statusText}. Message: ${getCatalogLink.message}`;
      throw new Error(errorMessage.displayMessage);
    }
    return res.status(200).json(getCatalogLink.data);
  } catch (error) {
    res.status(500).json({
      error: `Something went wrong: ${error.message}`,
    });
  }
}
