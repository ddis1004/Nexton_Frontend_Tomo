import { useTonClient } from "./useTonClient";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { Address, toNano } from "ton-core";
import { NexTon } from "./tact_NexTon";
import useTonConnect from "./useTonConnect";

function useNextonContract() {
  const contractAddress = `${import.meta.env.VITE_CONTRACT_ADDRESS}`;
  const client = useTonClient();
  const { sender, address } = useTonConnect();

  let nextonContract = useAsyncInitialize(async () => {
    if (!client) return;
    const contract = new NexTon(Address.parse(contractAddress));

    return client.open(contract);
  }, [client]);

  return {
    address: nextonContract?.address.toString(),
    sendMessage: async (data, value) => {
      if (nextonContract) {
        return await nextonContract.send(
          sender,
          { value: toNano(value) },
          data
        );
      } else {
        return () => {};
      }
    },
    sendValue: async (value) => {
      if (nextonContract) {
        return await sender.send({
          to: contractAddress,
          value: toNano(value),
        });
      } else {
        return () => {};
      }
    },
  };
}

export { useNextonContract };
