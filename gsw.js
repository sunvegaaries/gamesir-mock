// Mock server for GameSir G8+ offline mode
// Deploy to Vercel, then redirect clientgsw.vgabc.com via AdGuard DNS rewrite

const DEVICE_MENUS = {
  "GameSir-G8+": {
    "2": { layoutType: "1" },
    "3": {
      diagonalLock: "1", joystickSwap: "2", inversionXYAxis: "2",
      leftDeadZone: "1", leftOriginalZone: "1", leftSwopDPad: "1",
      lJsInversionXAxis: "2", lJsInversionYAxis: "2", lJsReverseDeadZone: "2",
      rightDeadZone: "1", rightOriginalZone: "1",
      rJsInversionXAxis: "2", rJsInversionYAxis: "2", rJsReverseDeadZone: "2"
    },
    "4": {
      leftGrip: "1", rightGrip: "1", experienceGrip: "1",
      experienceTrigger: "2", leftTrigger: "2", rightTrigger: "2",
      leftTriggerPressed: "2", leftTriggerSync: "2",
      rightTriggerPressed: "2", rightTriggerSync: "2"
    },
    "5": {
      leftTriggerDeadZone: "1", rightTriggerDeadZone: "1",
      leftQuickMode: "1", rightQuickMode: "1"
    }
  }
};

export default function handler(req, res) {
  const { action, device_name, menu_id } = req.query;

  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");

  if (action === "get_device_menu_info") {
    const device = device_name || "";
    const menuData = DEVICE_MENUS[device]?.[menu_id];
    
    if (menuData) {
      return res.json({ status: 1, data: menuData, msg: "Success" });
    }
    // Fallback -- повертаємо пустий успіх щоб не блокувало
    return res.json({ status: 1, data: {}, msg: "Success" });
  }

  // Всі інші запити -- повертаємо успіх
  return res.json({ status: 1, msg: "Success" });
}
