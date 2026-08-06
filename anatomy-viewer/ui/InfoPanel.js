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
