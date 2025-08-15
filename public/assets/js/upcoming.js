$(document).ready(function(){
     let currentPage = 1;
           let totalPages = 1;
            function loadupcomingItems(page) {
      $.ajax({
        url: `/api/upcoming?page=${page}`,
        method: 'GET',
        success: function(data) {
          let html = '';
          data.items.forEach(item => {
                if(item.length==0){
                   html+="<h1>No Upcoming Events Yet </h1>";
                }else{
                          html += `
                        <div class="col-lg-4 col-md-6 col-sm-6">
                        <div class="single-cases mb-40">
                            <div class="cases-img">
                                <img src="uploads/${item.filename}" alt="" style="height:250px;">
                            </div>
                            <div class="cases-caption">
                                <h3><a href="#">${item.heading}</a></h3>
                                <!-- Progress Bar -->
                                <div class="single-skill mb-15">
                                    <div class="bar-progress">
                                        <div id="bar1" class="barfiller">
                                            <div class="tipWrap">
                                                <span class="tip"></span>
                                            </div>
                                            <span class="fill" data-percentage="70"></span>
                                        </div>
                                    </div>
                                </div>
                                <!-- / progress -->
                                <div class="prices d-flex justify-content-between">
                                    <p>Date:<span> ${item.update}</span></p>
                                    <p>Time:<span> ${item.uptime}</span></p>
                                </div>
                                
                            </div>

                            
                        </div>
                    </div>
            `;
                }
          });
          $('#upcomingContainer').html(html);

          currentPage = data.currentPage;
          totalPages = data.totalPages;
          $('#pageInfo').text(`Page ${currentPage} of ${totalPages}`);

          $('#prevBtn').prop('disabled', currentPage === 1);
          $('#nextBtn').prop('disabled', currentPage === totalPages);
        },
        error: function(err) {
          $('#upcomingContainer').html('Error loading items.');
        }
      });
    }


    
    $('#prevBtn').click(function() {
      if (currentPage > 1) {
        loadupcomingItems(currentPage - 1);
      }
    });

    $('#nextBtn').click(function() {
      if (currentPage < totalPages) {
        loadupcomingItems(currentPage + 1);
      }
    });

    // Initial load
    loadupcomingItems(currentPage);
})