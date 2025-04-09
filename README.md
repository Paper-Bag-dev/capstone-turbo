# 🍃 Lichen Works — Forest Monitoring System with VOC Detection Capabilities

For our final year capstone project, we built **Lichen Works**—a low-cost, data-aggregating forest monitoring system that detects VOCs (Volatile Organic Compounds) and provides insights via a full-stack SaaS platform. It merges **IoT**, **finetuned LLMs**, **Langflow**, **regression models**, and modern web technologies like **Next.js**, **Node.js (TypeScript)**, **Flask**, and **Docker**. Key services are hosted on **AWS EC2** and **GCP Compute Engine**, fully containerized and uploaded to **DockerHub**.

---

## ✨ Novelty

We blended recent trends in tech to create a working MVP aligned with **2025 software standards**. From microservices to IOT to Langchain/LLM integrations, we explored practical applications of new research on VOC emissions and forest health monitoring—all wrapped into a modern, scalable architecture.

> 🔬 Built using a mix of R&D and product thinking, this system reflects real-world design while targeting an academic setting.

---

## 🎥 Demo Video

**[Insert Demo Link Here]**  
(We recommend watching this before diving into the code.)

---

## 🌱 Motivation

We wanted to go beyond traditional academic projects. The goal: build a **simple, scalable** solution for monitoring forest health that merges **sensor data**, **machine learning**, and **user-friendly insights**. Field officials and conservationists can easily register, add devices, and get real-time insights remotely using low-cost sensors.

---

## 🚀 How to Run

### 🔧 Running Locally:

1. Clone this repository.
2. Run `npm install` in the root directory.
3. Create `.env` files as per `.env.sample` and fill in necessary service credentials.
4. Run `npm run dev` for development mode.
5. Or, use `npm run build` followed by `npm start` for production mode.

### 📡 Connecting Hardware:

1. Flash the `ESP32Script.ino` (or customized version) using the Arduino IDE or ESP toolchain.
2. Update the webhook URL in the script with your hosted `backend-aggregator` endpoint (via Ngrok or live server).
3. Match your `deviceName` in the script with a registered device in the frontend.
4. Upload and start your ESP32 device.
5. Data will now stream to your dashboard in real-time!

**Note:** Change the necessary components in the ino script mentioned by the comment involving wifi creds, deviceName and webhook url to actually test it in production.
---

## 🧠 Key Features

- 📡 **IoT Webhook Integration:** Connect ESP32 or Arduino devices via simple HTTP requests.
- 📊 **Live Dashboard:** Visualize sensor data in real time.
- 🌿 **VOC Predictions:** Basic model to estimate VOC presence using humidity, temperature, and ppm data.
- 🤖 **LLM Chatbots:** Embedded Langflow chatbots that provide dynamic, data-driven insights and suggestions.
- 🔄 **Device Management:** Add, rename, or manage multiple devices per user session.

---

## 🖥️ UI Sneak Peek

> Scroll through for interface highlights:

![Dashboard](https://github.com/user-attachments/assets/4ecb3423-2fd5-42a1-8878-8736b0f6e5bb)  
![Page 1](https://github.com/user-attachments/assets/f9daf027-ad7b-4302-a032-a7db2fbcc829)  
![Page 2](https://github.com/user-attachments/assets/08dc41c4-61c2-4779-b290-ccc1f9eb2b05)  
![Page 3](https://github.com/user-attachments/assets/add48af9-ee17-4699-85a3-05a73f72a469)  
![Page 4](https://github.com/user-attachments/assets/e4eadceb-d131-4e6f-b55c-f8613511d678)  
![Page 5](https://github.com/user-attachments/assets/2290a8ef-4646-4ff8-a8a4-298cf893ddd2)

---

## 🔌 ESP32 Hardware

> Low-cost microcontroller used to transmit sensor data to our webhook:

![ESP32 Image 1](https://github.com/user-attachments/assets/9f2ad8a4-de4e-4fb4-b712-493604f3c4e0)  
![ESP32 Image 2](https://github.com/user-attachments/assets/3c40beac-c258-40d7-b2a4-b65ae325eda7)

---

## ✅ Strengths

- 🧩 Modular microservices-based design.
- ☁️ Deployed using **Docker**, **EC2**, **GCP**, and **DockerHub**.
- 🧠 Integrated **LLMs** and **Langflow** into the user dashboard for smart recommendations.
- 📡 End-to-end IoT communication with near real-time sensor feedback.
- 🎯 Built using industry-relevant tools (Next.js 15, Tailwind CSS v4, TypeScript, Flask).

---

## 📉 Known Limitations

1. ⚠️ **Testing frameworks** are not implemented for all services. Some routes lack robust test coverage, and error handling is basic or minimal.
2. 🧪 We prioritized building an MVP to showcase core functionality, so some UX elements and detailed user flows were skipped due to time constraints.
3. 🔬 **Feasibility testing** of the complete system was limited. Some features relied on **synthetic or small-scale data** due to lack of large datasets or real-world deployment resources.
4. 🌫️ **VOC prediction** currently handles basic humidity, temp, and PPM data but lacks depth for multi-feature prediction or accurate VOC type classification. This can be improved in future iterations.

---

## Tech Stack:

**Frontend:**
- 💻 Next.js 15
- 🎨 Tailwind CSS v4
- 🧩 ShadCN UI Components

**Backend:**
- 🟦 Node.js (TypeScript)
- 🐍 Flask (Python)

**IoT Integration:**
- 🔌 ESP32 Microcontroller
- 📡 Arduino Webhooks
- 🌿 VOC Sensor (PPM, Humidity, Temp)

**AI/ML:**
- 🤖 Fine-tuned LLM (Langflow)
- 📈 Regression Model for VOC Estimation

**Infrastructure:**
- 🌐 Docker & DockerHub
- 🐳 Docker & DockerHub
- ☁️ AWS EC2 & GCP Compute Engine


## 💬 Final Thoughts

This was built from scratch by an undergrad team with a real builder mindset 🛠️  
Despite constraints, we wanted to show what’s possible when ambition meets action. We're excited to keep polishing it and hope it inspires others to tinker, test, and iterate 🚀

Feel free to open issues, fork, or contribute if this excites you!

---

## 👥 Contributors

<table>
  <tr>
    <td align="center"><a href="https://github.com/Paper-Bag-dev"><img src="https://avatars.githubusercontent.com/Paper-Bag-dev" width="100px;" alt=""/><br /><sub><b>Vikalp Sharma</b></sub></a><br /><sub>Fullstack & IOT Engineer</sub></td>
    <td align="center"><a href="https://github.com/Vimall03"><img src="https://avatars.githubusercontent.com/Vimall03" width="100px;" alt=""/><br /><sub><b>Vimal M</b></sub></a><br /><sub>Langflow Engineer and Cloud deployment handler</sub></td>
    <td align="center"><a href="https://github.com/ayushnandi"><img src="https://avatars.githubusercontent.com/ayushnandi" width="100px;" alt=""/><br /><sub><b>Ayush Nandi</b></sub></a><br /><sub>Frontend Developer</sub></td>
    <td align="center"><a href="https://github.com/Abdev1205"><img src="https://avatars.githubusercontent.com/Abdev1205" width="100px;" alt=""/><br /><sub><b>Abhay Mishra</b></sub></a><br /><sub>Fullstack Developer & Webhook Developer</sub></td>
    <td align="center"><a href="https://github.com/DevangKapoor"><img src="https://avatars.githubusercontent.com/DevangKapoor" width="100px;" alt=""/><br /><sub><b>Devang Kapoor</b></sub></a><br /><sub>Fulltime game Dev & Parttime AI Enthusiast</sub></td>
  </tr>
</table>

