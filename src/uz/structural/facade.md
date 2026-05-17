---
title: Facade Pattern
description: Provides a unified, simplified interface to a set of interfaces in a subsystem
icon: Zap
---

# Facade Pattern

![Cover](/covers/structural/facade.png)

## Overview

The Facade Pattern is a structural design pattern that provides a unified, simplified interface to a set of interfaces in a subsystem. It defines a higher-level interface that makes a subsystem easier to use by hiding its complexity and internal details.

## Purpose

- **Simplify complex subsystems** by providing a single entry point
- **Reduce coupling** between clients and subsystem components
- **Create a unified interface** for heterogeneous classes
- **Hide internal complexity** from external clients
- **Provide a default implementation** that works for most use cases
- **Allow progressive complexity** exposure as needed

## Problem

Imagine a home automation system with many independent subsystems:

- **Lighting System**: Individual light objects with on/off controls
- **Temperature System**: Thermostats, heaters, coolers
- **Security System**: Door locks, alarm, sensors
- **Entertainment System**: TV, sound system, lights
- **Energy System**: Power management, solar panels, batteries

To turn on "movie mode", clients would need to:

1. Dim the lights in the entertainment room
2. Close the window blinds
3. Set temperature to comfortable level
4. Turn on the TV and sound system
5. Adjust lights to accent colors
6. Lock the doors
7. Activate privacy mode

Without the Facade Pattern, clients must know about all these systems and coordinate them manually—complex and error-prone.

## Solution

The Facade Pattern provides a solution by:

1. **Creating a Facade Class**: Implements a high-level interface
2. **Delegating to Subsystems**: Internally uses subsystem components
3. **Simplifying Coordination**: Coordinates complex interactions
4. **Hiding Details**: Clients don't need to know subsystem internals
5. **Maintaining Access**: Clients can still access subsystems directly if needed

## Implementation

::: code-group

```typescript [typescript]
// ========== Subsystem Components ==========

class LightingSystem {
dimLights(level: number): void {
console.log(`Dimming lights to ${level}%`);
}

turnOnLights(): void {
console.log('Turning on all lights');
}

turnOffLights(): void {
console.log('Turning off all lights');
}

setAmbientLighting(): void {
console.log('Setting ambient lighting');
}
}

class TemperatureSystem {
setTemperature(celsius: number): void {
console.log(`Setting temperature to ${celsius}°C`);
}

activateHeating(): void {
console.log('Activating heating system');
}

activateCooling(): void {
console.log('Activating cooling system');
}
}

class SecuritySystem {
lockDoors(): void {
console.log('Locking all doors');
}

unlockDoors(): void {
console.log('Unlocking all doors');
}

activateAlarm(): void {
console.log('Activating security alarm');
}

deactivateAlarm(): void {
console.log('Deactivating security alarm');
}

activatePrivacyMode(): void {
console.log('Activating privacy mode (blocking windows)');
}
}

class EntertainmentSystem {
turnOnTV(): void {
console.log('Turning on television');
}

turnOffTV(): void {
console.log('Turning off television');
}

turnOnSoundSystem(): void {
console.log('Turning on sound system');
}

turnOffSoundSystem(): void {
console.log('Turning off sound system');
}

setSurroundSound(): void {
console.log('Setting surround sound mode');
}
}

class EnergySystem {
checkBatteryLevel(): number {
console.log('Checking battery level');
return 85;
}

activateSolarMode(): void {
console.log('Activating solar power mode');
}

disableSolarMode(): void {
console.log('Disabling solar power mode');
}
}

// ========== Facade Class ==========

class HomeAutomationFacade {
private lighting: LightingSystem;
private temperature: TemperatureSystem;
private security: SecuritySystem;
private entertainment: EntertainmentSystem;
private energy: EnergySystem;

constructor() {
this.lighting = new LightingSystem();
this.temperature = new TemperatureSystem();
this.security = new SecuritySystem();
this.entertainment = new EntertainmentSystem();
this.energy = new EnergySystem();
}

// High-level convenience methods
activateMovieMode(): void {
console.log('\n=== Activating Movie Mode ===');
this.lighting.dimLights(10);
this.lighting.setAmbientLighting();
this.temperature.setTemperature(22);
this.entertainment.turnOnTV();
this.entertainment.turnOnSoundSystem();
this.entertainment.setSurroundSound();
this.security.lockDoors();
console.log('Movie Mode activated!');
}

activateSleepMode(): void {
console.log('\n=== Activating Sleep Mode ===');
this.lighting.turnOffLights();
this.temperature.setTemperature(18);
this.entertainment.turnOffTV();
this.entertainment.turnOffSoundSystem();
this.security.lockDoors();
this.security.activateAlarm();
console.log('Sleep Mode activated!');
}

activateAwayMode(): void {
console.log('\n=== Activating Away Mode ===');
this.lighting.turnOffLights();
this.entertainment.turnOffTV();
this.entertainment.turnOffSoundSystem();
this.security.lockDoors();
this.security.activateAlarm();
this.security.activatePrivacyMode();
const batteryLevel = this.energy.checkBatteryLevel();
if (batteryLevel > 20) {
this.energy.activateSolarMode();
}
console.log('Away Mode activated!');
}

activatePartyMode(): void {
console.log('\n=== Activating Party Mode ===');
this.lighting.turnOnLights();
this.lighting.setAmbientLighting();
this.temperature.setTemperature(24);
this.entertainment.turnOnTV();
this.entertainment.turnOnSoundSystem();
this.security.unlockDoors();
console.log('Party Mode activated!');
}

deactivateAllModes(): void {
console.log('\n=== Deactivating All Modes ===');
this.lighting.turnOffLights();
this.entertainment.turnOffTV();
this.entertainment.turnOffSoundSystem();
this.security.deactivateAlarm();
console.log('All systems deactivated!');
}

// Access to subsystems for advanced users
getLightingSystem(): LightingSystem {
return this.lighting;
}

getTemperatureSystem(): TemperatureSystem {
return this.temperature;
}

getSecuritySystem(): SecuritySystem {
return this.security;
}

getEntertainmentSystem(): EntertainmentSystem {
return this.entertainment;
}

getEnergySystem(): EnergySystem {
return this.energy;
}
}

// ========== Usage ==========

const homeFacade = new HomeAutomationFacade();

// Simple usage with facade
homeFacade.activateMovieMode();
homeFacade.activateSleepMode();
homeFacade.activateAwayMode();

// Advanced usage - access subsystems directly if needed
console.log('\n=== Custom Configuration ===');
const lighting = homeFacade.getLightingSystem();
const temperature = homeFacade.getTemperatureSystem();

lighting.dimLights(50);
temperature.setTemperature(20);

// ========== Real-world example: Web Framework Facade ==========

class DatabaseConnection {
query(sql: string): any[] {
console.log(`Executing query: ${sql}`);
return [];
}

close(): void {
console.log('Database connection closed');
}
}

class AuthenticationService {
authenticate(username: string, password: string): boolean {
console.log(`Authenticating user: ${username}`);
return true;
}

generateToken(): string {
console.log('Generating auth token');
return 'token_12345';
}
}

class LoggingService {
log(level: string, message: string): void {
console.log(`[${level}] ${message}`);
}

info(message: string): void {
this.log('INFO', message);
}

error(message: string): void {
this.log('ERROR', message);
}
}

class CachingService {
set(key: string, value: any): void {
console.log(`Setting cache: ${key}`);
}

get(key: string): any {
console.log(`Getting cache: ${key}`);
return null;
}

invalidate(key: string): void {
console.log(`Invalidating cache: ${key}`);
}
}

// Web Framework Facade
class WebFramework {
private db: DatabaseConnection;
private auth: AuthenticationService;
private logger: LoggingService;
private cache: CachingService;

constructor() {
this.db = new DatabaseConnection();
this.auth = new AuthenticationService();
this.logger = new LoggingService();
this.cache = new CachingService();
}

handleUserLogin(username: string, password: string): string {
console.log('\n=== Processing Login Request ===');

    this.logger.info(`Login attempt for user: ${username}`);

    // Check cache first
    const cachedResult = this.cache.get(`user_${username}`);
    if (cachedResult) {
      this.logger.info('User found in cache');
      return cachedResult;
    }

    // Authenticate
    if (!this.auth.authenticate(username, password)) {
      this.logger.error('Authentication failed');
      return 'null';
    }

    // Generate token
    const token = this.auth.generateToken();

    // Cache the result
    this.cache.set(`user_${username}`, token);

    this.logger.info('Login successful');
    return token;

}

handleUserLogout(username: string): void {
console.log('\n=== Processing Logout Request ===');

    this.logger.info(`Logout for user: ${username}`);
    this.cache.invalidate(`user_${username}`);
    this.logger.info('Logout complete');

}

getDatabase(): DatabaseConnection {
return this.db;
}

getLogger(): LoggingService {
return this.logger;
}
}

// ========== Web Framework Usage ==========

const framework = new WebFramework();
const token = framework.handleUserLogin('john_doe', 'password123');
console.log(`Received token: ${token}`);

framework.handleUserLogout('john_doe');

// Access services directly for advanced configuration
const logger = framework.getLogger();
logger.error('Custom error message');
```

  
```python [python]
# ========== Subsystem Components ==========

class LightingSystem:
    def dim_lights(self, level: int) -> None:
        print(f"Dimming lights to {level}%")

    def turn_on_lights(self) -> None:
        print("Turning on all lights")

    def turn_off_lights(self) -> None:
        print("Turning off all lights")

    def set_ambient_lighting(self) -> None:
        print("Setting ambient lighting")

class TemperatureSystem:
    def set_temperature(self, celsius: int) -> None:
        print(f"Setting temperature to {celsius}°C")

    def activate_heating(self) -> None:
        print("Activating heating system")

    def activate_cooling(self) -> None:
        print("Activating cooling system")

class SecuritySystem:
    def lock_doors(self) -> None:
        print("Locking all doors")

    def unlock_doors(self) -> None:
        print("Unlocking all doors")

    def activate_alarm(self) -> None:
        print("Activating security alarm")

    def deactivate_alarm(self) -> None:
        print("Deactivating security alarm")

    def activate_privacy_mode(self) -> None:
        print("Activating privacy mode (blocking windows)")

class EntertainmentSystem:
    def turn_on_tv(self) -> None:
        print("Turning on television")

    def turn_off_tv(self) -> None:
        print("Turning off television")

    def turn_on_sound_system(self) -> None:
        print("Turning on sound system")

    def turn_off_sound_system(self) -> None:
        print("Turning off sound system")

    def set_surround_sound(self) -> None:
        print("Setting surround sound mode")

class EnergySystem:
    def check_battery_level(self) -> int:
        print("Checking battery level")
        return 85

    def activate_solar_mode(self) -> None:
        print("Activating solar power mode")

    def disable_solar_mode(self) -> None:
        print("Disabling solar power mode")

# ========== Facade Class ==========

class HomeAutomationFacade:
    def __init__(self):
        self._lighting = LightingSystem()
        self._temperature = TemperatureSystem()
        self._security = SecuritySystem()
        self._entertainment = EntertainmentSystem()
        self._energy = EnergySystem()

    def activate_movie_mode(self) -> None:
        print("\n=== Activating Movie Mode ===")
        self._lighting.dim_lights(10)
        self._lighting.set_ambient_lighting()
        self._temperature.set_temperature(22)
        self._entertainment.turn_on_tv()
        self._entertainment.turn_on_sound_system()
        self._entertainment.set_surround_sound()
        self._security.lock_doors()
        print("Movie Mode activated!")

    def activate_sleep_mode(self) -> None:
        print("\n=== Activating Sleep Mode ===")
        self._lighting.turn_off_lights()
        self._temperature.set_temperature(18)
        self._entertainment.turn_off_tv()
        self._entertainment.turn_off_sound_system()
        self._security.lock_doors()
        self._security.activate_alarm()
        print("Sleep Mode activated!")

    def activate_away_mode(self) -> None:
        print("\n=== Activating Away Mode ===")
        self._lighting.turn_off_lights()
        self._entertainment.turn_off_tv()
        self._entertainment.turn_off_sound_system()
        self._security.lock_doors()
        self._security.activate_alarm()
        self._security.activate_privacy_mode()
        battery_level = self._energy.check_battery_level()
        if battery_level > 20:
            self._energy.activate_solar_mode()
        print("Away Mode activated!")

    def activate_party_mode(self) -> None:
        print("\n=== Activating Party Mode ===")
        self._lighting.turn_on_lights()
        self._lighting.set_ambient_lighting()
        self._temperature.set_temperature(24)
        self._entertainment.turn_on_tv()
        self._entertainment.turn_on_sound_system()
        self._security.unlock_doors()
        print("Party Mode activated!")

    def deactivate_all_modes(self) -> None:
        print("\n=== Deactivating All Modes ===")
        self._lighting.turn_off_lights()
        self._entertainment.turn_off_tv()
        self._entertainment.turn_off_sound_system()
        self._security.deactivate_alarm()
        print("All systems deactivated!")

    # Access to subsystems for advanced users
    def get_lighting_system(self) -> LightingSystem:
        return self._lighting

    def get_temperature_system(self) -> TemperatureSystem:
        return self._temperature

    def get_security_system(self) -> SecuritySystem:
        return self._security

    def get_entertainment_system(self) -> EntertainmentSystem:
        return self._entertainment

    def get_energy_system(self) -> EnergySystem:
        return self._energy

# ========== Usage ==========

home_facade = HomeAutomationFacade()

# Simple usage with facade
home_facade.activate_movie_mode()
home_facade.activate_sleep_mode()
home_facade.activate_away_mode()

# Advanced usage - access subsystems directly if needed
print("\n=== Custom Configuration ===")
lighting = home_facade.get_lighting_system()
temperature = home_facade.get_temperature_system()

lighting.dim_lights(50)
temperature.set_temperature(20)

# ========== Real-world example: Web Framework Facade ==========

class DatabaseConnection:
    def query(self, sql: str) -> list:
        print(f"Executing query: {sql}")
        return []

    def close(self) -> None:
        print("Database connection closed")

class AuthenticationService:
    def authenticate(self, username: str, password: str) -> bool:
        print(f"Authenticating user: {username}")
        return True

    def generate_token(self) -> str:
        print("Generating auth token")
        return "token_12345"

class LoggingService:
    def log(self, level: str, message: str) -> None:
        print(f"[{level}] {message}")

    def info(self, message: str) -> None:
        self.log("INFO", message)

    def error(self, message: str) -> None:
        self.log("ERROR", message)

class CachingService:
    def set(self, key: str, value: any) -> None:
        print(f"Setting cache: {key}")

    def get(self, key: str) -> any:
        print(f"Getting cache: {key}")
        return None

    def invalidate(self, key: str) -> None:
        print(f"Invalidating cache: {key}")

# Web Framework Facade
class WebFramework:
    def __init__(self):
        self._db = DatabaseConnection()
        self._auth = AuthenticationService()
        self._logger = LoggingService()
        self._cache = CachingService()

    def handle_user_login(self, username: str, password: str) -> str:
        print("\n=== Processing Login Request ===")

        self._logger.info(f"Login attempt for user: {username}")

        # Check cache first
        cached_result = self._cache.get(f"user_{username}")
        if cached_result:
            self._logger.info("User found in cache")
            return cached_result

        # Authenticate
        if not self._auth.authenticate(username, password):
            self._logger.error("Authentication failed")
            return "null"

        # Generate token
        token = self._auth.generate_token()

        # Cache the result
        self._cache.set(f"user_{username}", token)

        self._logger.info("Login successful")
        return token

    def handle_user_logout(self, username: str) -> None:
        print("\n=== Processing Logout Request ===")

        self._logger.info(f"Logout for user: {username}")
        self._cache.invalidate(f"user_{username}")
        self._logger.info("Logout complete")

    def get_database(self) -> DatabaseConnection:
        return self._db

    def get_logger(self) -> LoggingService:
        return self._logger

# ========== Web Framework Usage ==========

framework = WebFramework()
token = framework.handle_user_login("john_doe", "password123")
print(f"Received token: {token}")

framework.handle_user_logout("john_doe")

# Access services directly for advanced configuration
logger = framework.get_logger()
logger.error("Custom error message")
```

:::

## Real-World Example

**E-commerce Order Processing Facade**: An online store might have:

- **Inventory Service**: Track product stock
- **Payment Service**: Process payments
- **Shipping Service**: Calculate shipping costs and arrange delivery
- **Email Service**: Send order confirmations
- **Notification Service**: Alert customer of status changes

A simple `PlaceOrderFacade` coordinates all these services so customers just call `placeOrder(items, address)` without needing to understand internal complexity.

## Advantages

::: tip
✅ **Simplified Interface**: Clients see one simple interface instead of many complex ones

✅ **Reduced Coupling**: Clients depend on the facade, not on subsystem components

✅ **Easier Maintenance**: Changes to subsystems don't affect clients using the facade

✅ **Clear Documentation**: The facade serves as documentation for common use cases

✅ **Layered Subsystems**: Encapsulates and organizes subsystems into layers

✅ **Flexibility**: Clients can still access subsystems directly if needed

✅ **Progressive Complexity**: Facade handles 80% of use cases; advanced users can access internals
:::

## Disadvantages

::: warning
❌ **God Object Risk**: Facade can become a "god object" knowing too much

❌ **Limited Flexibility**: Not all use cases can be handled by the facade

❌ **Additional Abstraction**: Extra layer of indirection can complicate architecture

❌ **Maintenance Burden**: Facade needs updating when subsystems change

❌ **Performance Overhead**: Extra layer adds method call overhead

❌ **Difficult Evolution**: Hard to extend facade without breaking existing interface

❌ **Hides Subsystem Details**: Sometimes detailed control is necessary and hidden
:::

## When to Use

- You have a complex subsystem with many components
- You want to provide a simple interface to complex functionality
- You need to reduce coupling between clients and subsystems
- You're layering subsystems and need to communicate between layers
- Most clients need only basic functionality
- You want to decouple clients from subsystem classes
- You're integrating with legacy or third-party systems

## When NOT to Use

- You have only one or two classes (not a subsystem)
- Clients need fine-grained control over all subsystem components
- The "simplified" interface would hide important functionality
- The subsystem is stable and rarely changes
- Performance is critical and overhead is unacceptable
- You're not sure what the common use cases are yet

## Related Patterns

- **Adapter Pattern**: Adapts one interface to another, while Facade simplifies complex interfaces
- **Bridge Pattern**: Decouples abstraction from implementation, while Facade simplifies subsystems
- **Decorator Pattern**: Adds responsibilities to objects, while Facade provides simplified access
- **Composite Pattern**: Composes objects into trees, while Facade provides simplified access to subsystems
- **Abstract Factory Pattern**: Often used with Facade to create subsystem components
- **Mediator Pattern**: Similar to Facade but manages communication between peer objects
