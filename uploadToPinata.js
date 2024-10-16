require('dotenv').config();
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

async function uploadImageToPinata(imagePath) {
	const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

	try {
		const formData = new FormData();
		formData.append('file', fs.createReadStream(imagePath));

		const metadata = JSON.stringify({
			name: 'Jude Nft',
			keyvalues: {
				description: 'This Nft symbolizes the tenacity of programmers',
			},
		});
		formData.append('pinataMetadata', metadata);

		const pinataOptions = JSON.stringify({
			cidVersion: 0,
		});

		formData.append('pinataOptions', pinataOptions);

		const response = await axios.post(url, formData, {
			maxBodyLength: 'Infinity',
			headers: {
				'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
				pinata_api_key: process.env.PINATA_API_KEY,
				pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY,
			},
		});

		console.log(`Image uploaded to Pinata`, response?.data);

		return response?.data;
	} catch (error) {
		const errorMessage = error?.data?.response?.message ?? error?.message;
		console.error(`error uploading image to pinata: ${errorMessage}`);
	}
}

(async () => {
	const imagePath = path.join(__dirname, 'Ronado.jpg');
	const result = await uploadImageToPinata(imagePath);
	console.log('IPFS Hash (CID): ', result.IpfsHash);
})();
