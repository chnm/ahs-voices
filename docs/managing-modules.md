# Managing Omeka S Modules

This guide explains what modules are, which modules are bundled with Arlington Stories, and how a repository maintainer and an Omeka administrator work together to add one.

For the standard Omeka interface, see the official [Modules Management](https://omeka.org/s/docs/user-manual/modules/) guide, which includes screenshots.

## The short version

Modules cannot be uploaded through the Omeka admin interface. In this project:

1. A repository maintainer downloads a compatible release ZIP and places it in [`plugins/`](../plugins/).
2. The project's Docker startup script extracts new module ZIPs into Omeka.
3. A Global Administrator opens **Admin → Modules** and installs or activates the module.

If you are an archive editor and need a module that is not listed under **Modules**, send the module name and its download page to the repository maintainer. Do not download an arbitrary ZIP or source-code snapshot yourself.

## Three module states

It helps to distinguish three similar-sounding states:

- **Bundled** means a release ZIP is stored in this repository's `plugins/` directory. It will be available whenever the project is deployed from the repository.
- **Installed** means Omeka has registered the module and run any database setup it requires.
- **Active** means the installed module's features are currently enabled.

The **Admin → Modules** page is the authoritative place to check whether a bundled module is installed and active. A ZIP in the repository does not prove that the module has been activated on every deployment.

## Activate a module that is already bundled

Only a Global Administrator can install, activate, deactivate, or configure modules. Other account roles may have less access.

1. Log in to the Omeka admin dashboard.
2. Select **Modules** in the left navigation.
3. Find the module by name.
4. Follow the action shown beside it:
   - **Install** registers the module and normally activates it automatically.
   - **Activate** enables a module that is installed but inactive.
   - **Configure** opens settings for a module that provides them.
5. Confirm that Omeka displays a success message.
6. Test the relevant admin feature and its public display.

If Omeka reports a missing dependency, install or activate the dependency first. For example, **Block Plus** requires **Common**.

> **Deactivate is not the same as uninstall.** Deactivation turns features off while preserving the module's data. Uninstalling may delete module-created database tables and data. Do not uninstall a module without a backup and a specific removal plan.

## Add a new module to the project

These steps require repository and deployment access and are intended for a maintainer.

### 1. Find and evaluate the module

Start with the official [Omeka S Modules directory](https://omeka.org/s/modules). Before downloading anything, confirm:

- the release supports **Omeka S 4.2** (the version used by this project);
- it comes from the module's official download or releases page;
- all required dependencies are available;
- its maintenance status, documentation, license, and support channel are acceptable; and
- its feature does not duplicate something already provided by Omeka core or a bundled module.

Download a packaged **release ZIP**, not a repository's “source code” archive. Release packages may contain dependencies that are absent from source snapshots.

### 2. Add the ZIP to `plugins/`

Keep the module name and version in the filename, following the existing convention:

```text
plugins/ModuleName-1.2.3.zip
```

The ZIP should expand to one top-level module directory whose name does not include a version number—for example, `Mapping/`, not `Mapping-2.2.0/`.

### 3. Restart the Omeka service

From the repository root:

```bash
docker compose restart omeka-s
```

The `plugins/` directory is mounted inside the container at `/srv/plugins`. On startup, [`docker/omeka-s/install-modules.sh`](../docker/omeka-s/install-modules.sh) extracts any new ZIP whose module directory is not already present.

To verify what happened:

```bash
docker compose logs omeka-s
```

Look for `Installing module: ModuleName` or `Module already installed: ModuleName`.

### 4. Install or activate it in Omeka

The repository step makes the module available; it does not complete Omeka's database installation. A Global Administrator must finish the process under **Admin → Modules**.

### 5. Test before publishing

Test the module in the local or staging environment before deploying it to production. At minimum, verify:

- installation and activation complete without errors;
- existing admin and public pages still load;
- the new feature works with this theme;
- pages remain usable at desktop and mobile widths; and
- deactivation returns the site to a working state.

Commit the release ZIP and any required theme integration together so future deployments remain reproducible.

## Updating an existing module

Adding a new module and upgrading an existing one are different operations. The startup script deliberately does **not** overwrite an existing module directory, so replacing a ZIP with a newer version and restarting is not sufficient.

Plan upgrades with a maintainer. Back up the database and current module, check the module's upgrade instructions, replace the deployed module directory safely, and then use the **Upgrade** action under **Admin → Modules**. Never use `docker compose down -v` as an upgrade method: it deletes the project database and other persistent volumes.

See Omeka's [Updating a module](https://omeka.org/s/docs/user-manual/modules/#updating-a-module) instructions for the general process.

## Worked example: how Mapping was added

[Mapping](https://omeka.org/s/docs/user-manual/modules/mapping/) is the module that adds locations to items and interactive maps to sites.

For this project:

1. The official `Mapping-2.2.0.zip` release was added to [`plugins/`](../plugins/).
2. Docker mounts that directory at `/srv/plugins` in the Omeka container.
3. The startup script extracts the ZIP as `/var/www/html/modules/Mapping` when the module is not already present.
4. A Global Administrator installs or activates **Mapping** under **Admin → Modules**.
5. Mapping adds a **Mapping** tab to the item editor, map page blocks, and a **Map Browse** navigation option.
6. The theme's [`mapping/site/index/browse.phtml`](../theme/view/mapping/site/index/browse.phtml) override gives the public Map Browse page the Arlington Stories presentation while preserving Mapping's scripts and styles.

Editors can then add locations from an item's **Mapping** tab. See [Putting an interview on the map](adding-oral-histories.md#putting-an-interview-on-the-map) for the content workflow.

## Modules currently bundled

The following release ZIPs are currently stored in `plugins/`. Their installation and activation state may differ by deployment.

| Module | Version | What it provides |
|---|---:|---|
| [Activity Log](https://omeka.org/s/docs/user-manual/modules/activitylog/) | 1.0.1 | Records user activity for administrative review. |
| [Advanced Search](https://gitlab.com/Daniel-KM/Omeka-S-module-AdvancedSearch) | 3.4.61 | Adds richer search fields, filters, facets, and search pages. |
| [Block Plus](https://omeka.org/s/modules/BlockPlus/) | 3.4.45 | Adds page models and advanced editorial blocks; requires Common. |
| [Bulk Edit](https://gitlab.com/Daniel-KM/Omeka-S-module-BulkEdit) | 3.4.39 | Adds advanced batch metadata cleanup and editing tools. |
| [Clean URL](https://gitlab.com/Daniel-KM/omeka-s-module-CleanUrl) | 3.17.14 | Provides configurable, human-readable resource URLs. |
| [Common](https://gitlab.com/Daniel-KM/Omeka-S-module-Common) | 3.4.86 | Supplies shared infrastructure required by several other modules. |
| [Custom Vocab](https://omeka.org/s/docs/user-manual/modules/customvocab/) | 2.1.0 | Lets administrators create controlled lists of metadata values. |
| [Faceted Browse](https://omeka.org/s/docs/user-manual/modules/facetedbrowse/) | 1.9.2 | Adds filterable, faceted browsing pages. |
| [Feed](https://gitlab.com/Daniel-KM/Omeka-S-module-Feed) | 3.4.9 | Produces RSS and Atom feeds for selected pages or resources. |
| [Google Analytics](https://github.com/Libnamic/Omeka-S-GoogleAnalytics) | 1.3.1 | Adds Google Analytics tracking when configured. |
| [Mapping](https://omeka.org/s/docs/user-manual/modules/mapping/) | 2.2.0 | Adds item locations, interactive maps, map blocks, and map browsing. |
| [Metadata Browse](https://omeka.org/s/docs/user-manual/modules/metadatabrowse/) | 1.6.1 | Links metadata values to resources sharing the same value. |
| [Resource Meta](https://omeka.org/s/docs/user-manual/modules/resourcemeta/) | 1.1.0 | Adds configurable metadata tags to public resource pages. |
| [Rights Statements](https://github.com/zerocrates/RightsStatements) | 1.2.1 | Adds RightsStatements.org choices for rights metadata. |
| [Sharing](https://omeka.org/s/docs/user-manual/modules/sharing/) | 1.5.0 | Adds tools for sharing and embedding public content. |
| [Sitemaps](https://github.com/ManOnDaMoon/omeka-s-module-Sitemaps) | 1.1 | Generates site-specific XML sitemaps for search engines. |
| [Statistics](https://gitlab.com/Daniel-KM/Omeka-S-module-Statistics) | 3.4.14 | Adds administrative counts and statistics about resources. |
| [Universal Viewer](https://gitlab.com/Daniel-KM/Omeka-S-module-UniversalViewer) | 3.6.15-4.2.1 | Provides a unified viewer for images, PDFs, audiovisual files, and IIIF content. |

## Troubleshooting

### The module does not appear under Admin → Modules

- Confirm that its ZIP exists in `plugins/`.
- Confirm that the Omeka container restarted after the ZIP was added.
- Check `docker compose logs omeka-s` for extraction errors.
- Inspect the ZIP structure: it must contain one correctly named module directory, not an extra wrapper directory.
- Confirm that the module supports Omeka S 4.2 and the server's PHP version.

### Omeka reports a missing dependency

Locate the dependency in `plugins/`, install or activate it first, then retry the original module. Consult the module's release documentation for version requirements.

### A module is present but its feature is missing

Check whether the module is merely installed but inactive. Some modules also require configuration, a site setting, a navigation entry, or a particular page block before anything appears publicly.

## Related documentation

- [Building and Editing Site Pages](building-pages.md)
- [Adding an Oral History](adding-oral-histories.md)
- [Omeka S: Modules Management](https://omeka.org/s/docs/user-manual/modules/)
- [Omeka S Modules directory](https://omeka.org/s/modules)
- [Omeka S: Mapping](https://omeka.org/s/docs/user-manual/modules/mapping/)
- [Developer notes](../DEVNOTES.md#modules)
