import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("devices", "routes/devices.tsx"),
] satisfies RouteConfig;
