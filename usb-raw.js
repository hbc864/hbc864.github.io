let device;

document.getElementById('connect-button').addEventListener('click', async () => {
    try {
        device = await navigator.usb.requestDevice({ 
            filters: [{ 
                vendorId: 0x05e0 // Replace with the correct vendorId
                
            }] 
        });

        await device.open();
        console.log('Device opened');

        await device.selectConfiguration(1);
        console.log('Configuration selected');

        await device.claimInterface(0);
        console.log('Interface claimed');

        document.getElementById('output').innerText = 'Connected to USB device';
    } catch (error) {
        console.error(error);
        document.getElementById('output').innerText = `Failed to connect to USB device: ${error.message}`;
    }
});

document.getElementById('read-button').addEventListener('click', async () => {
    try {
        const result = await readFromDevice();
        document.getElementById('output').innerText = `Read data: ${new TextDecoder().decode(result.data)}`;
    } catch (error) {
        console.error(error);
        document.getElementById('output').innerText = `Error: ${error.message}`;
    }
});

document.getElementById('write-button').addEventListener('click', async () => {
    try {
        const dataToSend = new TextEncoder().encode('Hello, USB device!');
        await writeToDevice(dataToSend);
        document.getElementById('output').innerText = 'Data written to device';
    } catch (error) {
        console.error(error);
        document.getElementById('output').innerText = `Error: ${error.message}`;
    }
});

async function readFromDevice() {
    if (!device) {
        throw new Error('Device not connected');
    }
    // Adjust endpoint number and length according to your device
    return await device.transferIn(1, 64);
}

async function writeToDevice(data) {
    if (!device) {
        throw new Error('Device not connected');
    }
    // Adjust endpoint number according to your device
    await device.transferOut(1, data);
}
