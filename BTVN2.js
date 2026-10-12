const devices = [
    {
        id: "DEV_001",
        name: "Dieu hoa phong khach",
        room: "Phong khach",
        powerWatts: 1500,
        isActive: true
    },
    {
        id: "DEV_002",
        name: "Den ngu",
        room: "Phong ngu",
        powerWatts: 10,
        isActive: true
    },
    {
        id: "DEV_003",
        name: "Quat phong khach",
        room: "Phong khach",
        powerWatts: 75,
        isActive: false
    }
];

// 1. Validator: kiem tra du lieu thiet bi
const validateDevice = (device) => {
    if (device === null || typeof device !== "object") {
        return false;
    }

    if (typeof device.name !== "string" || device.name.trim() === "") {
        return false;
    }

    if (typeof device.room !== "string" || device.room.trim() === "") {
        return false;
    }

    if (
        typeof device.powerWatts !== "number" ||
        !Number.isFinite(device.powerWatts) ||
        device.powerWatts <= 0
    ) {
        return false;
    }

    return true;
};

// 2. Tim thiet bi theo ID
const findDeviceById = (list, id) => {
    for (let i = 0; i < list.length; i++) {
        if (list[i].id === id) {
            return list[i];
        }
    }

    return null;
};

// 3. CREATE: Them thiet bi moi
const createDevice = (list, newDev) => {
    if (!validateDevice(newDev)) {
        console.log("Du lieu khong hop le!");
        return null;
    }

    // Tim so ID lon nhat de tranh trung ID sau khi xoa
    let maxId = 0;

    for (let i = 0; i < list.length; i++) {
        const numberPart = Number(list[i].id.replace("DEV_", ""));

        if (Number.isInteger(numberPart) && numberPart > maxId) {
            maxId = numberPart;
        }
    }

    const newId = "DEV_" + String(maxId + 1).padStart(3, "0");

    const device = {
        id: newId,
        name: newDev.name.trim(),
        room: newDev.room.trim(),
        powerWatts: newDev.powerWatts,
        isActive: newDev.isActive === undefined ? false : newDev.isActive
    };

    if (typeof device.isActive !== "boolean") {
        console.log("Trang thai isActive phai la true hoac false!");
        return null;
    }

    list.push(device);

    console.log("Them thiet bi thanh cong:", device.id);
    return device;
};

// 4. READ: Doc danh sach thiet bi theo phong
const readDevicesByRoom = (list, roomName) => {
    if (typeof roomName !== "string" || roomName.trim() === "") {
        return [];
    }

    return list.filter(
        (device) =>
            device.room.toLowerCase() === roomName.trim().toLowerCase()
    );
};

// 5. UPDATE: Cap nhat thiet bi an toan
const updateDevice = (list, id, updateData) => {
    const targetDevice = findDeviceById(list, id);

    if (targetDevice === null) {
        console.log("Khong tim thay thiet bi:", id);
        return false;
    }

    if (updateData === null || typeof updateData !== "object") {
        return false;
    }

    // Kiem tra cac truong duoc gui len truoc khi cap nhat
    if (
        updateData.name !== undefined &&
        (typeof updateData.name !== "string" ||
            updateData.name.trim() === "")
    ) {
        return false;
    }

    if (
        updateData.room !== undefined &&
        (typeof updateData.room !== "string" ||
            updateData.room.trim() === "")
    ) {
        return false;
    }

    if (
        updateData.powerWatts !== undefined &&
        (typeof updateData.powerWatts !== "number" ||
            !Number.isFinite(updateData.powerWatts) ||
            updateData.powerWatts < 0)
    ) {
        return false;
    }

    if (
        updateData.isActive !== undefined &&
        typeof updateData.isActive !== "boolean"
    ) {
        return false;
    }

    // Chi cap nhat cac truong duoc truyen vao
    if (updateData.name !== undefined) {
        targetDevice.name = updateData.name.trim();
    }

    if (updateData.room !== undefined) {
        targetDevice.room = updateData.room.trim();
    }

    if (updateData.powerWatts !== undefined) {
        targetDevice.powerWatts = updateData.powerWatts;
    }

    if (updateData.isActive !== undefined) {
        targetDevice.isActive = updateData.isActive;
    }

    console.log("Cap nhat thanh cong:", id);
    return true;
};

// 6. DELETE: Xoa thiet bi theo ID
const deleteDevice = (list, id) => {
    for (let i = 0; i < list.length; i++) {
        if (list[i].id === id) {
            list.splice(i, 1);
            console.log("Da xoa thiet bi:", id);
            return true;
        }
    }

    console.log("Khong tim thay thiet bi de xoa:", id);
    return false;
};

