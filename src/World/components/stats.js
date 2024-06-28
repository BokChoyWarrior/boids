import Stats from "../../../vendor/three/examples/jsm/libs/stats.module.js"

function createStats() {
    const stats = new Stats()

    stats.simulate = () => {}
    stats.render = (_delta) => {
        stats.update()
    }

    return stats;
}

export { createStats }