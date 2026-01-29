import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

/**
 * Despliega el contrato ToDoList usando la cuenta "deployer"
 *
 * @param hre objeto del Hardhat Runtime Environment.
 */
const deployToDoList: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("ToDoList", {
    from: deployer,
    // Los argumentos del constructor van aquí (nuestro contrato no tiene, así que va vacío)
    args: [],
    log: true,
    // autoMine acelera el despliegue en redes locales
    autoMine: true,
  });

  // Obtenemos el contrato desplegado para mostrar algo en consola
  const toDoList = await hre.ethers.getContract("ToDoList", deployer);
  console.log("🚀 ToDoList desplegado en:", toDoList.target);
};

export default deployToDoList;

// Etiquetas para identificar el despliegue
deployToDoList.tags = ["ToDoList"];