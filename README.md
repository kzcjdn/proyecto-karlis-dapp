# ✅ ToDo List DApp - Karlis Zambrano

Este proyecto es una aplicación descentralizada (DApp) de lista de tareas, construida como parte de mi aprendizaje en desarrollo Web3. Permite a los usuarios grabar tareas directamente en la blockchain de **Sepolia**.

## 🚀 Mi Actividad Realizada
Para completar este proyecto, realicé las siguientes acciones técnicas:
- **Smart Contract**: Desarrollé un contrato inteligente `ToDoList.sol` para gestionar tareas de forma inmutable.
- **Despliegue**: Desplegué el contrato en la red de prueba **Sepolia** en la dirección `0x8C1Ed8319841CcE06BEd3F6333ad9E7f507d090C`.
- **Verificación**: Verifiqué el código en **Etherscan**, obteniendo la tilde verde ✅ de transparencia.
- **Frontend**: Personalicé la interfaz usando **Scaffold-ETH 2** y Next.js, conectándola a la red real.
- **Hosting**: Publiqué la DApp en **Vercel** para acceso público.

## 🛠️ Tecnologías Usadas
Este proyecto utiliza el stack de **Scaffold-ETH 2**:
- **Solidity** para el contrato inteligente.
- **NextJS** y **Tailwind CSS** para la interfaz.
- **Viem & Wagmi** para la interacción con la billetera.
- **Hardhat** para el entorno de desarrollo y despliegue.

🧠 Lógica del Contrato Inteligente (ToDoList.sol)
El corazón de esta DApp es un contrato escrito en Solidity, diseñado para ser eficiente y seguro. Estas son sus funcionalidades principales:

Estructura de Datos: Utilicé un struct Task para almacenar el contenido de la tarea y su estado (completada o pendiente).

Gestión de Usuarios: El contrato utiliza un mapping(address => Task[]) para asegurar que cada usuario vea únicamente sus propias tareas, manteniendo la privacidad de la información.

Funciones Principales:

createTask: Permite guardar un nuevo string en la blockchain, emitiendo un evento para que el frontend se actualice automáticamente.

toggleCompleted: Cambia el estado de una tarea de pendiente a completada directamente en el almacenamiento de la red Sepolia.

Optimización: El contrato fue verificado en Etherscan, lo que permite interactuar con estas funciones incluso sin usar la interfaz de Vercel.

## 🔗 Enlaces del Proyecto
- **DApp en Vivo**: [https://proyecto-karlis-dapp-nextjs.vercel.app/](https://proyecto-karlis-dapp-nextjs.vercel.app/)
- **Contrato en Etherscan**: [https://sepolia.etherscan.io/address/0x8C1Ed8319841CcE06BEd3F6333ad9E7f507d090C](https://sepolia.etherscan.io/address/0x8C1Ed8319841CcE06BEd3F6333ad9E7f507d090C)