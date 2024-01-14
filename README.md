# PUS-SmartMirror
## "Embedded software development" project - Faculty of organization and informatics, 2023-2024

Withing the "Embedded software development" subject, in the "Game development" module, a select few of the students decided to work on a "Smart mirror" project, the details of which will be further layed out in the continuation of this document.
### Project overview
* Project will consist of a "smart mirror"; it's essentially a monitor encased within a 3D printed frame for support, atop of which there will be an actual glass mirror panel;
* It will be built with a Raspberry Pi
* It will employ several features;
	* With its WiFi module, the Smart Mirror will be able to connect to a chosen connection
	* With its BT module, the Smart Mirror will also be able to connect to another device, preferably mobile device
- Main features include:
	- Weather API, which will show tempature in region, as well as current weather state
	- Time; the mirror will display correct datetime (according to timezone)
	- Camera, through which the mirror will biometrically turn on and off
- Other implementations:
	- With BT/WiFI connection, "Smart mirror" will pull notifications from the selected device
	- It wil also be able to supply "Spotify" information; song name, artist, duration
### Use Case: Smart Mirror in a Home Environment
**Actor:** Homeowner/End User
**Goal:** To utilize and interact with the Smart Mirror in a home setting for convenience and information retrieval.

**Preconditions:**
- The Smart Mirror is properly set up, connected to a power source, and has an internet connection via Wi-Fi.
- The necessary software and applications (Weather API, Spotify, Camera recognition) are installed and configured on the Raspberry Pi.

**Basic Flow:**
1. **Powering On and Authentication:**
    - The homeowner approaches the Smart Mirror.
    - The biometric camera recognizes the homeowner and activates the mirror's display automatically.

2. **Displaying Essential Information:**
    - The Smart Mirror displays the current time, synced to the correct timezone.
    - Weather information, including the local temperature and current weather conditions, is showcased prominently.

3. **Interaction with External Devices:**
    - The mirror establishes a Bluetooth connection with the homeowner's mobile device.
    - Incoming notifications from the connected mobile device (such as text messages or calendar alerts) are displayed on the mirror's interface.

4. **Entertainment Integration:**
    - Spotify integration allows the mirror to exhibit details about the currently playing song, including the song name, artist, and duration.

5. **Usage and Interactivity:**
    - The homeowner can interact with the mirror in a traditional way, for appearance; no extra interactivity will be implemented besides what's already been documented
    - They may edit the additional information, such as the weather, if decided on

6. **Powering Off:**
    - When the homeowner leaves the vicinity or after a specified period of inactivity, the biometric camera recognizes the absence and turns off the display to conserve energy.

**Postconditions:**
- The Smart Mirror provides the homeowner with essential information (time, weather) and serves as a convenient hub for notifications and entertainment details.
- The mirror enhances the home environment by blending functionality with everyday utility, making it an integral part of the household.

**Alternate Flow:**

- **Connection Issues:**
    - If the Wi-Fi or Bluetooth connection encounters problems, the mirror displays an error message or notification, prompting the homeowner to troubleshoot the connectivity.

This use case exemplifies the practical functionality of the Smart Mirror within a home environment, showcasing its capabilities in providing information while ensuring user convenience and ease of use.
