import {
  CapacitorBarcodeScanner,
  CapacitorBarcodeScannerTypeHint,
} from "@capacitor/barcode-scanner";
import { Sync } from "./../graphql/queries/sync.graphql";
import client from "../graphql/client";
import {
  SyncMutation,
  SyncMutationVariables,
} from "../graphql/generated/graphql";
import { useQuestionnaireStore } from "../store";

export const startSync = async (): Promise<boolean> => {
  while (true) {
    try {
      const data = await CapacitorBarcodeScanner.scanBarcode({
        scanButton: false,
        hint: CapacitorBarcodeScannerTypeHint["QR_CODE"],
      });

      const barCode = data.ScanResult;

      if (!barCode) {
        continue;
      }

      const items = barCode.split("::") ?? [];

      if (items.length === 4) {
        const shortId = useQuestionnaireStore.getState().shortId;

        const { data } = await client.mutate<
          SyncMutation,
          SyncMutationVariables
        >({
          mutation: Sync,
          variables: {
            serial: shortId ?? "",
            deviceName: items[0],
            institutionId: items[1],
            workflowId: items[2],
            doctorIds: items[3].split(","),
          },
        });

        if (data?.createDevices.devices?.[0]) {
          return true;
        }
      }
    } catch {
      continue;
    }
  }
};
