import { GUI } from '../../../vendor/three/examples/jsm/libs/dat.gui.module.js'

function createBoidsGui(settings) {
    const settingsNames = {
        'Coherence': 8,
        'Alignment': 4,
        'Separation': 16,
        'Target Finding': 3,
    }
    function modifyCohereWeight(weight) {
        settings.cohereWeight = weight
    }
    function modifyAlignWeight(weight) {
        settings.alignWeight = weight
    }
    function modifySeparateWeight(weight) {
        settings.separateWeight = weight
    }
    function modifyFindTargetWeight(weight) {
        settings.findTargetWeight = weight
    }

    const gui = new GUI({ name: "BoidController" })

    const folders = []
    // const folder1 = gui.addFolder('General')
    const folder2 = gui.addFolder('Forces')
    const folder3 = gui.addFolder('Sensory Radii')
    const folder4 = gui.addFolder('Weights')

    folders.push(folder2, folder3, folder4)

    folder2.add(settings, 'minSpeed', 0, 150, 5)
    folder2.add(settings, 'maxSpeed', 5, 250, 5)
    folder2.add(settings, 'maxSteerForce', 0, 10, 1)

    folder3.add(settings, 'cohereRadius', 0, 250, 5)
    folder3.add(settings, 'alignRadius', 0, 250, 5)
    folder3.add(settings, 'separateRadius', 0, 100, 2)

    folder4.add(settingsNames, 'Coherence', 0, 25, 0.2)
        .onChange(modifyCohereWeight)
    folder4.add(settingsNames, 'Alignment', 0, 25, 0.2)
        .onChange(modifyAlignWeight)
    folder4.add(settingsNames, 'Separation', 0, 25, 0.2)
        .onChange(modifySeparateWeight)
    folder4.add(settingsNames, 'Target Finding', 0, 25, 0.2)
        .onChange(modifyFindTargetWeight)


    for (let folder of folders) {
        folder.open()
    }
    gui.simulate = () => { }

    gui.render = () => { gui.update() }

    return gui
}

export { createBoidsGui }