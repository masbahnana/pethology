export function clearStructureInfo() {
    const panel = document.querySelector("#structure-info");
    panel.classList.add("empty");
    panel.innerHTML = `
        <div class="structure-icon">🦴</div>
        <p>Select a structure from the model or the list below.</p>
    `;
}

export function showStructureInfo(structure) {
    const panel = document.querySelector("#structure-info");

    panel.classList.remove("empty");

    panel.innerHTML = `
        <span class="eyebrow">${structure.system}</span>

        <h2>🦴 ${structure.name}</h2>

        <dl>
            <dt>English</dt>
            <dd>${structure.english ?? "—"}</dd>

            <dt>Latin</dt>
            <dd>${structure.latin ?? "—"}</dd>

            <dt>Region</dt>
            <dd>${structure.region ?? "—"}</dd>
        </dl>

        <p class="structure-description">
            ${structure.description}
        </p>
    `;
}

export function setActiveStructureItem(structureKey) {
    const buttons = document.querySelectorAll("#structure-list button");

    buttons.forEach((button) => {
        const isActive = button.dataset.structureKey === structureKey;
        button.classList.toggle("active", isActive);
    });
}

export function clearActiveStructureItem() {
    setActiveStructureItem(null);
}

export function renderStructureList(dictionary, { onHover, onLeave, onSelect }) {
    const list = document.querySelector("#structure-list");

    list.innerHTML = "";

    Object.entries(dictionary).forEach(([key, structure]) => {
        const item = document.createElement("li");
        const button = document.createElement("button");

        button.type = "button";
        button.dataset.structureKey = key;

        button.innerHTML = `
            <span class="structure-dot" style="--structure-color: ${structure.color ?? '#2383E2'}"></span>
            <span>${structure.name}</span>
        `;

        button.addEventListener("pointerenter", () => onHover(key));
        button.addEventListener("pointerleave", () => onLeave());
        button.addEventListener("click", () => onSelect(key, structure));

        item.appendChild(button);
        list.appendChild(item);
    });
}
