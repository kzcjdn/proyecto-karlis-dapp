// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract ToDoList {
    struct Task {
        uint256 id;
        string content;
        bool completed;
        uint256 timestamp;
    }

    mapping(address => Task[]) private userTasks;
    uint256 public taskCount;

    event TaskCreated(address indexed user, uint256 id, string content);
    event TaskStatusToggled(address indexed user, uint256 id, bool completed);

    function createTask(string memory _content) public {
        taskCount++;
        userTasks[msg.sender].push(Task(taskCount, _content, false, block.timestamp));
        emit TaskCreated(msg.sender, taskCount, _content);
    }

    function toggleCompleted(uint256 _index) public {
        Task storage task = userTasks[msg.sender][_index];
        task.completed = !task.completed;
        emit TaskStatusToggled(msg.sender, task.id, task.completed);
    }

    function getTasks() public view returns (Task[] memory) {
        return userTasks[msg.sender];
    }
}