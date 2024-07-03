document.getElementById('connect-button').addEventListener('click', async () => {
    try {
        const device = await navigator.usb.requestDevice({ filters: [{ vendorId: 0x05e0 }] }); // Replace with the correct vendorId
        await device.open();
        await device.selectConfiguration(1);
        //await device.claimInterface(0);

        document.getElementById('output').innerText = 'Connected to barcode scanner';

        device.transferIn(1, 64).then(handleData).catch(handleError);
    } catch (error) {
        console.error(error);
        document.getElementById('output').innerText = 'Failed to connect to barcode scanner : ' + error;
    }
});

function handleData(result) {
    const decoder = new TextDecoder();
    const barcode = decoder.decode(result.data);
    document.getElementById('output').innerText = `Scanned barcode: ${barcode}`;
    // Listen for the next barcode
    device.transferIn(1, 64).then(handleData).catch(handleError);
}

function handleError(error) {
    console.error(error);
    document.getElementById('output').innerText = `Error: ${error.message}`;
}
