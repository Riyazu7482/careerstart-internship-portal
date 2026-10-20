

  const jobs = JSON.parse(
    document.getElementById("internships-data").textContent
);

const jobContainer = document.getElementById("jobContainer");
const resultCount = document.getElementById("resultCount");
const emptyMessage = document.getElementById("emptyMessage");
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const locationFilter = document.getElementById("locationFilter");
const categoryFilters = document.getElementById("categoryFilters");
const jobDialog = document.getElementById("jobDialog");
const dialogContent = document.getElementById("dialogContent");

let selectedCategory = "All";

function formatStipend(job) {
    const type = job.stipend_type;

    if (type === "UNPAID") {
        return "Unpaid";
    }

    if (type === "FIXED" && job.stipend_min !== null) {
        return `₹${Number(job.stipend_min).toLocaleString("en-IN")}/month`;
    }

    if (
        type === "RANGE" &&
        job.stipend_min !== null &&
        job.stipend_max !== null
    ) {
        const min = Number(job.stipend_min).toLocaleString("en-IN");
        const max = Number(job.stipend_max).toLocaleString("en-IN");
        return `₹${min}–₹${max}/month`;
    }

    return "Stipend not specified";
}

function renderJobs() {
  const searchText = searchInput.value.toLowerCase().trim();
  const selectedLocation = locationFilter.value;

console.log("Total internships:", jobs.length, jobs);
console.table(jobs.map(job => ({
    title: job.title,
    category: job.category
})));
  const filteredJobs = jobs.filter(job => {
    const searchableText = [
      job.title,
      job.company,
      job.category,
      ...job.skills
    ].join(" ").toLowerCase();

    const matchesSearch = searchableText.includes(searchText);
    const matchesLocation =
    !selectedLocation ||
    job.location.toLowerCase().includes(selectedLocation.toLowerCase());
   
const normalizeCategory = (value) =>
    (value || "").toLowerCase().trim()
        .replace(/&/g, "and")
        .replace(/[^a-z0-9]+/g, " ")
        .trim();


const selected = normalizeCategory(selectedCategory);

const matchesCategory =
    !selected ||
    selected === "all" ||
    normalizeCategory(job.category) === selected;

 

    return matchesSearch && matchesLocation && matchesCategory;
  });

  jobContainer.innerHTML = "";

  filteredJobs.forEach(job => {
    const card = document.createElement("article");
    card.className = "job-card";

    const tags = job.skills.map(skill =>
      `<span class="tag">${skill}</span>`
    ).join("");

    card.innerHTML = `
      <div class="job-top">
        <div class="company-icon">${job.company[0]}</div>
        <div>
          <strong>${job.company}</strong>
          <p class="company-name">${job.type}</p>
        </div>
      </div>

<h3>${job.title}</h3>
<p class="job-location">📍 ${job.location}</p>
<p class="job-stipend">💰 ${formatStipend(job)}</p>

<div class="tags">${tags}</div>

      
      <button class="card-button" data-id="${job.id}">
        View Details
      </button>
    `;

    jobContainer.appendChild(card);
  });

  resultCount.textContent =
    `${filteredJobs.length} opportunities found`;

  emptyMessage.hidden = filteredJobs.length !== 0;
}

function showJobDetails(id) {
  const job = jobs.find(item => item.id === id);
  if (!job) return;

  dialogContent.innerHTML = `
    <h2>${job.title}</h2>
    <p><strong>Company:</strong> ${job.company}</p>
    <p><strong>Location:</strong> ${job.location}</p>
<p><strong>Type:</strong> ${job.type}</p>
<p><strong>Stipend:</strong> ${formatStipend(job)}</p>
<p><strong>Skills:</strong> ${job.skills.join(", ")}</p>


    <h3>About this role</h3>
    <p>${job.description}</p>

    ${
        job.apply_link
            ? `<a href="${job.apply_link}"
                 target="_blank"
                 rel="noopener noreferrer"
                 class="apply-button">Apply Now</a>`
            : `<p><em>Application link is not available yet.</em></p>`
    }
`;

jobDialog.showModal();
}

searchForm.addEventListener("submit", event => {
  event.preventDefault();
  renderJobs();
  document.getElementById("jobs").scrollIntoView();
});

locationFilter.addEventListener("change", renderJobs);

categoryFilters.addEventListener("click", event => {
  const button = event.target.closest("[data-category]");
  if (!button) return;

  selectedCategory = button.dataset.category;

  document.querySelectorAll(".filter").forEach(item => {
    item.classList.toggle("active", item === button);
  });

  renderJobs();
});

jobContainer.addEventListener("click", event => {
  const button = event.target.closest("[data-id]");
  if (!button) return;

  showJobDetails(Number(button.dataset.id));
});

document.getElementById("closeDialog").addEventListener(
  "click",
  () => jobDialog.close()
);

renderJobs();
document.querySelectorAll(".category-card").forEach((card) => {
    card.addEventListener("click", () => {
        selectedCategory = card.dataset.category;

        document.querySelectorAll(".category-card").forEach((item) => {
            item.classList.toggle("active", item === card);
        });

        renderJobs();

        document.getElementById("jobs").scrollIntoView({
            behavior: "smooth"
        });
    });
});

document.querySelectorAll("[data-category]").forEach((card) => {
    card.addEventListener("click", () => {
        selectedCategory = card.dataset.category;

        renderJobs();

        document.querySelector("#jobs")?.scrollIntoView({
            behavior: "smooth"
        });
    });
});
