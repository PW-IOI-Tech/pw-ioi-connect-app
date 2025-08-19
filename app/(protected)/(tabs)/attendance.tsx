import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { BleManager } from "react-native-ble-plx";
import { Button } from "@/components/ui";

const manager = new BleManager();

interface Device {
  id: string;
  name: string;
  rssi: number | null;
  manufacturerData: string | null;
}

interface AttendanceStatus {
  marked: boolean;
  distance: string | null;
  deviceName: string | null;
  timestamp: string | null;
}

const searchDeviceName = "BCPro_206838";

export default function BluetoothScanner() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [scanning, setScanning] = useState(false);
  const [attendanceStatus, setAttendanceStatus] =
    useState<AttendanceStatus | null>(null);

  const markAttendance = () => {
    const foundDevice = devices.find(
      (device) => device.name === searchDeviceName,
    );
    if (foundDevice) {
      const distance = foundDevice.rssi
        ? foundDevice.rssi > -70
          ? `close ${foundDevice.rssi}dBm`
          : `far ${foundDevice.rssi}dBm`
        : "unknown";
      setAttendanceStatus({
        marked: true,
        distance,
        deviceName: foundDevice.name,
        timestamp: new Date().toISOString(),
      });
      console.log(`Attendance marked for device: ${foundDevice.name}`);
    } else {
      setAttendanceStatus({
        marked: false,
        distance: null,
        deviceName: null,
        timestamp: null,
      });
      console.log("No matching device found, attendance not marked.");
    }
  };

  const scanForDevices = () => {
    console.log("Scanning for BLE devices...");
    setScanning(true);
    setDevices([]); // Clear previous results

    manager.startDeviceScan(
      null,
      { allowDuplicates: false },
      (error, device) => {
        if (error) {
          console.error("Scan error:", error);
          setScanning(false);
          return;
        }

        if (device) {
          setDevices((prevDevices) => {
            // Avoid duplicates
            const exists = prevDevices.find((d) => d.id === device.id);
            if (!exists) {
              return [
                ...prevDevices,
                {
                  id: device.id,
                  name: device.name || "Unknown Device",
                  rssi: device.rssi,
                  manufacturerData: device.manufacturerData,
                },
              ];
            }
            return prevDevices;
          });
        }
      },
    );

    // Stop scanning after 10 seconds
    setTimeout(() => {
      console.log("Stopping scan...");
      manager.stopDeviceScan();
      markAttendance(); // Attempt to mark attendance after scan
      setScanning(false);
    }, 10000);
  };

  const clearDevices = () => {
    setDevices([]);
    setAttendanceStatus(null);
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Mark Your Attendance
      </Text>

      <View style={{ flexDirection: "row", gap: 10, marginBottom: 20 }}>
        <Button
          onPress={scanForDevices}
          disabled={scanning}
          style={{ flex: 1 }}
        >
          {scanning ? "Scanning..." : "Mark Attendance"}
        </Button>

        <Button onPress={clearDevices} variant="outline" style={{ flex: 1 }}>
          Clear
        </Button>
      </View>

      <Text style={{ fontSize: 18, marginBottom: 10 }}>
        Found Devices: {devices.length}
      </Text>

      <ScrollView style={{ flex: 1 }}>
        {devices.map((device) => (
          <View
            key={device.id}
            style={{
              padding: 15,
              marginBottom: 10,
              backgroundColor: "#f5f5f5",
              borderRadius: 8,
              borderWidth: 1,
              borderColor: "#ddd",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {device.name}
            </Text>
            <Text style={{ fontSize: 12, color: "#666", marginTop: 5 }}>
              ID: {device.id}
            </Text>
            <Text style={{ fontSize: 12, color: "#666" }}>
              RSSI: {device.rssi} dBm
            </Text>
            {device.manufacturerData && (
              <Text style={{ fontSize: 12, color: "#666" }}>
                Has Manufacturer Data
              </Text>
            )}
          </View>
        ))}

        {devices.length === 0 && !scanning && (
          <Text style={{ textAlign: "center", color: "#999", marginTop: 50 }}>
            No devices found. Tap "Scan Devices" to start scanning.
          </Text>
        )}
      </ScrollView>

      {/* Display Attendance status */}
      {attendanceStatus && (
        <View
          style={{
            marginTop: 20,
            padding: 15,
            backgroundColor: "#e0f7fa",
            borderRadius: 8,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            Attendance Status
          </Text>
          <Text style={{ fontSize: 14 }}>
            Marked: {attendanceStatus.marked ? "Yes" : "No"}
          </Text>
          {attendanceStatus.marked && (
            <>
              <Text style={{ fontSize: 14 }}>
                Device Name: {attendanceStatus.deviceName || "N/A"}
              </Text>
              <Text style={{ fontSize: 14 }}>
                Distance: {attendanceStatus.distance || "N/A"}
              </Text>
              <Text style={{ fontSize: 14 }}>
                {/* format the timestamp correctly */}
                Timestamp:{" "}
                {attendanceStatus.timestamp
                  ? new Date(attendanceStatus.timestamp).toLocaleString()
                  : "N/A"}
              </Text>
            </>
          )}
        </View>
      )}
    </View>
  );
}
