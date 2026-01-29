"use client";

import { useState } from "react";
import { 
  useAccount, 
  useBalance, 
  useReadContract, 
  useWriteContract, 
  useWatchContractEvent, 
  useWaitForTransactionReceipt 
} from "wagmi";

// IMPORTACIONES ESTÁNDAR DE SCAFFOLD-ETH 2
// Apuntamos a la carpeta raíz de componentes/hooks para que el index.ts haga el trabajo

import { useDeployedContractInfo } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

export default function ToDoApp() {
  const { address } = useAccount();
  const { data: balance } = useBalance({ address });
  const [newTask, setNewTask] = useState("");

  const { data: deployedContractData } = useDeployedContractInfo("ToDoList");

  // Hooks de lectura y escritura (se mantienen igual que en tu versión funcional)
  const { data: tasks, refetch: refetchTasks } = useReadContract({
    address: deployedContractData?.address,
    abi: deployedContractData?.abi,
    functionName: "getTasks",
    account: address,
  });

  const { data: hash, writeContractAsync, isPending } = useWriteContract();
  const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash });

  const handleCreateTask = async () => {
    if (!deployedContractData || !newTask) return;
    try {
      await writeContractAsync({
        address: deployedContractData.address,
        abi: deployedContractData.abi,
        functionName: "createTask",
        args: [newTask],
      });
      setNewTask("");
    } catch (e) {
      notification.error("Error al crear tarea");
    }
  };

  const handleToggle = async (index: number) => {
  if (!deployedContractData) return;
  try {
    await writeContractAsync({
      address: deployedContractData.address,
      abi: deployedContractData.abi,
      functionName: "toggleCompleted",
      args: [BigInt(index)], // Convertimos el índice a BigInt para el contrato
    });
  } catch (e) {
    console.error("Error al actualizar:", e);
    notification.error("Error al actualizar la tarea");
  }
};

  useWatchContractEvent({
    address: deployedContractData?.address,
    abi: deployedContractData?.abi as any,
    eventName: 'TaskCreated',
    onLogs() {
      notification.info("✨ ¡Nueva tarea detectada!");
      refetchTasks();
    },
  });

  return (
    <div className="flex items-center flex-col flex-grow pt-10">
      <div className="px-5 w-[90%] md:w-[500px]">
        <h1 className="text-center mb-8">
          <span className="block text-4xl font-bold text-primary tracking-tight">ToDo DApp</span>
          <span className="block text-sm opacity-50 uppercase tracking-widest text-base-content">Blockchain List</span>
        </h1>

        {/* Sección de Perfil Profesional */}
        <div className="bg-base-200 p-4 rounded-3xl mb-6 flex justify-between items-center shadow-lg border border-base-300">
          <div>
            <p className="text-[10px] m-0 opacity-50 uppercase font-bold mb-1">Wallet Conectada</p>
            <span className="text-xs font-mono bg-base-300 px-2 py-1 rounded-lg">
  {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "No conectado"}
</span>
          </div>
          <div className="text-right">
            <p className="text-[10px] m-0 opacity-50 uppercase font-bold mb-1">Saldo</p>
            <p className="m-0 font-mono font-bold text-secondary">
              {balance ? `${balance.formatted.slice(0, 6)} ${balance.symbol}` : "0.00 ETH"}
            </p>
          </div>
        </div>

        {/* Input con estado de carga interactivo */}
        <div className="flex gap-2 mb-8 bg-base-200 p-2 rounded-2xl shadow-inner border border-base-300">
          <input
            type="text"
            placeholder="¿Qué tarea grabaremos hoy?"
            className="input input-ghost w-full focus:outline-none focus:bg-transparent"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button 
            className={`btn btn-primary rounded-xl px-6 ${isPending ? 'loading' : ''}`}
            onClick={handleCreateTask}
            disabled={!newTask || isPending}
          >
            {isPending ? "Enviando..." : "Añadir"}
          </button>
        </div>

        {/* Lista Inmutable */}
        <div className="bg-base-100 rounded-3xl shadow-2xl p-6 border border-base-300">
          <h2 className="text-lg font-bold mb-4 opacity-80 flex justify-between">
            Tareas en la Red
            {Array.isArray(tasks) && (
              <span className="badge badge-ghost">{(tasks as any[]).length}</span>
            )}
          </h2>
          <div className="space-y-3">
            {tasks && (tasks as any[]).length > 0 ? (
              (tasks as any[]).map((task, index) => (
                <div key={index} className={`flex items-center gap-3 p-4 rounded-2xl transition-all duration-300 ${task.completed ? 'bg-base-300/20' : 'bg-base-200 hover:scale-[1.02] shadow-sm'}`}>
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary checkbox-sm rounded-md"
                    checked={task.completed}
                    onChange={() => handleToggle(index)}
                  />
                  <span className={`flex-grow text-sm font-medium ${task.completed ? 'line-through opacity-40' : ''}`}>
                    {task.content}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center py-10 opacity-40 italic text-sm border-2 border-dashed border-base-300 rounded-2xl">
                No hay tareas registradas en el contrato.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}