let device;

document.getElementById('connect-button').addEventListener('click', async () => {
    try {
        const devices = await navigator.hid.requestDevice({
            filters: [{ vendorId: 0x05e0 }] // Replace with the correct vendorId
        });
        if (devices.length === 0) {
            throw new Error('No device selected');
        }
        device = devices[0];
        await device.open();

        document.getElementById('output').innerText = 'Connected to barcode scanner';

        device.oninputreport = (event) => {
            const decoder = new TextDecoder();
            const barcode = decoder.decode(event.data);
            document.getElementById('output').innerText = `Scanned barcode: ${barcode}`;
        };
    } catch (error) {
        console.error(error);
        document.getElementById('output').innerText = `Failed to connect to barcode scanner: ${error.message}`;
    }
});
