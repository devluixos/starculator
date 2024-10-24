<?php
// backend/src/Controller/ApiController.php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Contracts\HttpClient\HttpClientInterface;

#[Route('/api', name: 'api_')]
class ApiController extends AbstractController
{
    private $client;

    public function __construct(HttpClientInterface $client)
    {
        $this->client = $client;
    }

    #[Route('/ships', name: 'ships', methods: ['GET'])]
    public function getShips(): JsonResponse
    {
        try {
            // Test data for now
            $testData = [
                'ships' => [
                    [
                        'name' => 'Aurora MR',
                        'manufacturer' => 'Roberts Space Industries',
                        'size' => 'Small',
                        'crew' => '1',
                        'role' => 'Starter',
                    ],
                    [
                        'name' => 'Constellation Andromeda',
                        'manufacturer' => 'Roberts Space Industries',
                        'size' => 'Large',
                        'crew' => '4',
                        'role' => 'Multipurpose',
                    ],
                ],
                'status' => 'success',
                'timestamp' => time()
            ];

            return new JsonResponse($testData, Response::HTTP_OK);

            // TODO: Uncomment this when ready to use the real API
            // $response = $this->client->request('GET', 'https://api.star-citizen.wiki/v2/ships', [
            //     'headers' => [
            //         'Authorization' => 'Bearer ' . $_ENV['SC_WIKI_API_KEY']
            //     ]
            // ]);
            
            // return new JsonResponse($response->toArray(), Response::HTTP_OK);

        } catch (\Exception $e) {
            return new JsonResponse(
                ['error' => $e->getMessage()],
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }

    #[Route('/ships/test', name: 'ships_test', methods: ['GET'])]
    public function testEndpoint(): JsonResponse
    {
        return new JsonResponse([
            'message' => 'API is working!',
            'timestamp' => time()
        ]);
    }

    #[Route('/hello', name: 'hello')]
    public function hello(): JsonResponse
    {
        return new JsonResponse(['message' => 'Hello!']);
    }
}